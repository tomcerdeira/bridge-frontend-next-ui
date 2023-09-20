'use client'

import toast from "@/components/toast";
import { useVerify } from "@/src/api/users";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

type Props = {
	token: string
	children?: React.ReactNode
  }

export default function Verify({ children, token }: Props) {
    const { doVerify, error, isLoading } = useVerify({token});
    const router = useRouter();

	const handleSubmit = async () => {
        try {
            const user = await doVerify();
            if (!!user){
                toast({ type: 'success', message: 'Cuenta verificada correctamente.' });
                router.push("/");
            }
        } catch (err) {}
	};

    useEffect(() => {
        handleSubmit();
    }, []);

    return (
        <div className="gap-6 justify-center">
            <div className="w-full flex-shrink-0 overflow-hidden">
                {error &&
                (
                    <div>
                    <p className="mt-4 text-right text-red-400 text-xs">{error.message}</p>
                        <Link href="/">
                            <Button className="mt-4 w-full" variant="shadow">
                                Inicio
                            </Button>
                        </Link>
                    </div>
                )
                }
            </div>
        </div>
    );
}