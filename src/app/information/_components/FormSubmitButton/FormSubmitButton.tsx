import { Button } from '@chakra-ui/react';
import { useFormStatus } from 'react-dom';

const FormSubmitButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} isLoading={pending} color="#F47521">
            {children}
        </Button>
    );
};

export default FormSubmitButton;
