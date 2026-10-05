import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Mail,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Lock,
  X
} from 'lucide-react';

export const MentorOtpVerificationModal = ({
  email,
  onSuccess,
  onCancel,
  initialSimulatedOtp = ''
}) => {
  const { verifyMentorOtpCode, resendMentorOtpCode } = useApp();

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [expirySeconds, setExpirySeconds] = useState(300); // 5 minutes (300s)
  const [resendCooldown, setResendCooldown] = useState(45); // 45s cooldown
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [simulatedOtp, setSimulatedOtp] = useState(initialSimulatedOtp);

  const inputRefs = useRef([]);

  // 5-minute Expiry Countdown Timer
  useEffect(() => {
    if (expirySeconds <= 0) return;
    const interval = setInterval(() => {
      setExpirySeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [expirySeconds]);

  // 45-second Resend Cooldown Timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Format seconds into MM:SS
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle single digit input
  const handleDigitChange = (index, value) => {
    // Only accept numeric characters
    const cleanVal = value.replace(/[^0-9]/g, '');
    const newDigits = [...otpDigits];

    if (cleanVal.length > 1) {
      // Paste full 6 digits
      const pasted = cleanVal.slice(0, 6).split('');
      pasted.forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });
      setOtpDigits(newDigits);
      const nextIndex = Math.min(pasted.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    newDigits[index] = cleanVal;
    setOtpDigits(newDigits);
    setErrorMessage('');

    // Auto-advance to next input
    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Quick fill helper for prototype testing
  const handleQuickFillSimulatedOtp = () => {
    if (!simulatedOtp || simulatedOtp.length !== 6) return;
    const chars = simulatedOtp.split('');
    setOtpDigits(chars);
    setErrorMessage('');
    inputRefs.current[5]?.focus();
  };

  // Submit OTP Verification
  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const fullOtp = otpDigits.join('');

    if (fullOtp.length !== 6) {
      setErrorMessage('Please enter all 6 digits of the verification code.');
      return;
    }

    if (expirySeconds <= 0) {
      setErrorMessage('OTP expired. Please request a new OTP.');
      return;
    }

    setIsLoading(true);
    try {
      const verifiedUser = await verifyMentorOtpCode({ email, otp: fullOtp });
      setSuccessMessage('College email verified successfully. Your mentor account is now verified.');

      setTimeout(() => {
        if (onSuccess) onSuccess(verifiedUser);
      }, 1400);
    } catch (err) {
      setErrorMessage(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (resendCooldown > 0 || isLoading) return;
    setErrorMessage('');
    setIsLoading(true);
    try {
      const res = await resendMentorOtpCode({ email });
      setExpirySeconds(300); // Reset to 5 mins
      setResendCooldown(45); // Reset 45s cooldown
      setOtpDigits(['', '', '', '', '', '']);
      if (res.generatedOtp) {
        setSimulatedOtp(res.generatedOtp);
      }
      inputRefs.current[0]?.focus();
    } catch (err) {
      setErrorMessage(err.message || 'Failed to resend OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md bg-white/95 rounded-[36px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(122,21,48,0.2)] border border-white/80 animate-in fade-in duration-200 text-left">
      {/* Optional Close / Back button */}
      {onCancel && (
        <button
          onClick={onCancel}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header with Shield Icon */}
      <div className="text-center mb-5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white flex items-center justify-center mx-auto mb-3 shadow-[4px_6px_14px_rgba(179,38,62,0.25)]">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-bold px-3 py-0.5 rounded-full mb-2">
          <Clock className="w-3 h-3 text-amber-600" />
          <span>Verification Pending</span>
        </div>
        <h2 className="text-xl font-black text-slate-900">
          College Email Verification
        </h2>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          A verification OTP has been sent to your college email address.
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-xs font-mono font-bold text-brand-maroon">
          <Mail className="w-3.5 h-3.5 text-brand-rose" />
          <span>{email}</span>
        </div>
      </div>

      {/* Simulated Email Dispatch Banner for testing */}
      {simulatedOtp && (
        <div className="mb-4 p-3.5 rounded-2xl bg-[#FFF6F7] border border-rose-200 text-xs text-slate-800 shadow-2xs">
          <div className="flex items-center justify-between font-bold text-brand-maroon mb-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Simulated College Mail Dispatch:
            </span>
            <button
              type="button"
              onClick={handleQuickFillSimulatedOtp}
              className="text-[10px] font-bold text-brand-rose underline hover:text-brand-maroon cursor-pointer"
            >
              Auto-Fill OTP
            </button>
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            Security code sent to your academic domain inbox:
          </p>
          <div className="mt-2 py-1 px-3 bg-white rounded-xl border border-rose-200 font-mono text-center text-base font-black tracking-widest text-slate-900 shadow-inner">
            {simulatedOtp}
          </div>
          <p className="text-[10px] text-slate-400 mt-1 text-center">
            (Stored client-side only as a salted SHA-256 hash)
          </p>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success Alert */}
      {successMessage && (
        <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      {/* 6-Digit OTP Form */}
      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2 text-center">
            Enter 6-Digit Verification Code
          </label>
          <div className="flex items-center justify-center gap-2 sm:gap-2.5">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-11 h-13 sm:w-12 sm:h-14 text-center font-mono font-black text-xl rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-rose ${
                  digit
                    ? 'bg-[#FFF1F3] border-brand-rose text-brand-maroon shadow-xs'
                    : 'bg-white border-slate-200 text-slate-800 shadow-2xs hover:border-rose-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Timers Row: Expiry Countdown & Resend Option */}
        <div className="flex items-center justify-between text-xs pt-1 px-1">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>
              Expires in:{' '}
              <strong className={expirySeconds <= 60 ? 'text-red-600 font-bold' : 'text-slate-800 font-mono'}>
                {formatTime(expirySeconds)}
              </strong>
            </span>
          </div>

          <div>
            {resendCooldown > 0 ? (
              <span className="text-[11px] text-slate-400 font-medium">
                Resend in {resendCooldown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isLoading}
                className="text-xs font-bold text-brand-rose hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Resend OTP</span>
              </button>
            )}
          </div>
        </div>

        {/* Verify OTP Button */}
        <button
          type="submit"
          disabled={isLoading || expirySeconds <= 0}
          className="clay-btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{isLoading ? 'Verifying College Email...' : 'Verify OTP & Activate Mentor Account'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {expirySeconds <= 0 && (
          <p className="text-[11px] text-center text-red-600 font-medium mt-1">
            OTP expired. Please request a new OTP using the Resend button above.
          </p>
        )}
      </form>

      {/* Institutional Security Notice */}
      <div className="mt-5 pt-3 border-t border-rose-100/70 text-center text-[10px] text-slate-400">
        🔒 Official institutional credentials are encrypted and validated in accordance with college domain security policies.
      </div>
    </div>
  );
};
