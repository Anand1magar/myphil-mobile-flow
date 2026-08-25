export interface CaregiverModalProps {
  open?: boolean;
  onClose?: () => void;
  onConfirm?: (isCaregiver: boolean) => void;
  patientName?: string;
}
