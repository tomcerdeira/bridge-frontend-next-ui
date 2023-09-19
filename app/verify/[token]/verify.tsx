'use client'

import toast from "@/components/toast";
import { useVerify } from "@/src/api/users";
import { Progress } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

type Props = {
	token: string
	children?: React.ReactNode
  }

export default function Verify({ children, token }: Props) {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [loadingRequest, setLoadingRequest] = useState(false);

    const { doVerify, error, isLoading } = useVerify({token});
    const router = useRouter();

	const handleSubmit = async () => {
        try {
            setLoadingRequest(true);
            const user = await doVerify();
            if (!!user){
                toast({ type: 'success', message: 'Cuenta verificada correctamente.' });
                setLoadingRequest(false);
                router.push("/");
            }
        } catch (err) {} finally {
            setLoadingRequest(false);
        }
	};

    useEffect(() => {
        handleSubmit(); // Call the function when the component is mounted
    }, []);

    return (
        <div className="gap-6 justify-center">
            <div className="w-full flex-shrink-0 overflow-hidden">
                { !loadingRequest && (
                        <Progress
                        size="sm"
                        isIndeterminate
                        aria-label="Loading..."
                        className="max-w-md"
                      />
                )
                }
                {error && <p className="mt-4 text-right text-red-400 text-xs">{error.message}</p>}
            </div>
        </div>
    );
}