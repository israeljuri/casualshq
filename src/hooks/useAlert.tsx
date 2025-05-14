import React from 'react';
import { toast, ToastPosition, Toast } from 'react-hot-toast';
import AlertComponent from '@/components/ui/alert'; // Ensure this path is correct

type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface UseAlertOptions {
  subtext?: string;
  duration?: number;
  position?: ToastPosition;
  isDismissible?: boolean;
  onDismiss?: () => void;
}

const useAlert = () => {
  const showAlert = (
    title: string,
    variant: AlertVariant,
    options?: UseAlertOptions
  ) => {
    // Default values and destructuring
    const currentOptions = {
      subtext: options?.subtext,
      duration: options?.duration ?? 5000,
      position: options?.position ?? 'top-center',
      isDismissible: options?.isDismissible ?? true,
      onDismissCallback: options?.onDismiss,
    };

    const toastId = `custom-alert-${variant}-${title.replace(/\s+/g, '-')}-${Date.now()}`;

    // The function that renders the custom component
    const renderToast = (t: Toast): React.ReactElement => ( // Use React.ReactElement
      <AlertComponent
        variant={variant}
        title={title}
        subtext={currentOptions.subtext}
        isDismissible={currentOptions.isDismissible}
        onDismiss={() => {
          toast.dismiss(t.id); // Dismiss this specific toast
          if (currentOptions.onDismissCallback) {
            currentOptions.onDismissCallback();
          }
        }}
      />
    );

    // Call toast.custom with the render function and options
    toast.custom(renderToast, {
      id: toastId,
      duration: currentOptions.duration,
      position: currentOptions.position,
    });
  };

  const dismissAllAlerts = () => {
    toast.dismiss(); // Dismiss all toasts
  };

  return { showAlert, dismissAllAlerts };
};

export default useAlert;