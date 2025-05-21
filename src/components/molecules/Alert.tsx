import React from 'react';
import { toast } from 'react-hot-toast';

type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  variant: AlertVariant;
  title: string;
  subtext?: string;
  isDismissible?: boolean;
  onDismiss?: () => void; // Optional: if custom dismiss logic is needed beyond react-hot-toast
}

const iconPaths: Record<AlertVariant, string> = {
  success: '/alerts/success-icon.svg',
  error: '/alerts/error-icon.svg',
  warning: '/alerts/warning-icon.svg',
  info: '/alerts/info-icon.svg',
};

const variantStyles: Record<
  AlertVariant,
  {
    bg: string;
    iconContainerBg?: string;
    titleColor: string;
    subtextColor: string;
    iconColor: string;
    borderColor: string;
  }
> = {
  success: {
    bg: 'bg-[#E7F6EC]', // fill_4C7211
    titleColor: 'text-[#101928]', // fill_W8DFP6
    subtextColor: 'text-[#667185]', // fill_J5DVGL
    iconColor: '#0F973D', // fill_VU1WBC (used for icon directly, not container)
    borderColor: 'border-transparent', // stroke_9CUJCU is #FFFFFF, but design shows no visible border other than shadow
  },
  error: {
    bg: 'bg-[#FBEAE9]', // fill_5BC31X
    titleColor: 'text-[#101928]',
    subtextColor: 'text-[#667185]',
    iconColor: '#D42620', // fill_KUE6V6
    borderColor: 'border-transparent',
  },
  warning: {
    bg: 'bg-[#FEF6E7]', // fill_I1QN0S
    titleColor: 'text-[#101928]',
    subtextColor: 'text-[#667185]',
    iconColor: '#F3A218', // fill_NX8ZXP
    borderColor: 'border-transparent',
  },
  info: {
    bg: 'bg-[#E3EFFC]', // fill_RNS4CF
    titleColor: 'text-[#101928]',
    subtextColor: 'text-[#667185]',
    iconColor: '#1671D9', // fill_CRF0XA
    borderColor: 'border-transparent',
  },
};

const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  subtext,
  isDismissible = true,
  onDismiss,
}) => {
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      toast.dismiss(); // Default behavior if no onDismiss is provided
    }
  };

  const styles = variantStyles[variant];

  // Figma: layout_J3YQ7O - mode: row, gap: 16px, padding: 16px, borderRadius: 8px
  // Figma: effect_GYT8M0 - boxShadow: 0px 1px 2px 0px rgba(11, 3, 45, 0.08)
  const baseClasses = `grid gap-4 items-start grid-cols-[max-content_1fr_max-content] p-4 w-[343px] rounded-lg shadow-[0px_1px_2px_0px_rgba(11,3,45,0.08)] ${styles.bg} ${styles.borderColor}`;

  // Icon container: layout_5L9ATM - mode: row, alignItems: center, gap: 10px, padding: 10px, borderRadius: 100px
  // The Figma design shows the icon directly, not inside a separate padded container with a background.
  // The icon itself has a color.
  const iconContainerClasses =
    'bg-white rounded-full flex w-[3rem] h-[3rem] items-center justify-center'; // Adjusted for direct icon display, mr-4 for gap

  // Text section: layout_CDC39I - mode: column, gap: 4px
  const textSectionClasses = 'flex flex-col gap-1 flex-grow';

  // Heading: style_GFNMDQ - fontFamily: Instrument Sans, fontWeight: 500, fontSize: 16px
  const titleClasses = `font-medium text-base ${styles.titleColor}`; // Instrument Sans needs to be configured in Tailwind

  // Subtext: style_QJ3C67 - fontFamily: Instrument Sans, fontWeight: 400, fontSize: 14px
  const subtextClasses = `text-sm ${styles.subtextColor}`; // Instrument Sans needs to be configured in Tailwind

  return (
    <div className={baseClasses} role="alert" aria-live="assertive">
      <span className={iconContainerClasses}>
        <img src={iconPaths[variant]} alt={`${variant} icon`} className="" />
      </span>

      <div className={textSectionClasses}>
        <p className={titleClasses}>{title}</p>
        {subtext && <p className={subtextClasses}>{subtext}</p>}
      </div>

      {isDismissible && (
        <button
          onClick={handleDismiss}
          className="ml-auto p-1 rounded-full hover:opacity-50 transition-opacity duration-200 flex-shrink-0" // Adjusted margin and hover
          aria-label="Close alert"
        >
          <img src="/alerts/close-icon.svg" alt="Close icon" className="" />
        </button>
      )}
    </div>
  );
};

export default Alert;
