'use client'

import { useSignUp } from "@/src/api/users";
import { Button, Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import { useState } from "react";
import { EyeFilledIcon } from "./eyeFieldIcon";
import { EyeSlashFilledIcon } from "./eyeSlashFieldIcon";
import { MailIcon } from "./mailIcon";

export default function SignUpForm() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [loadingRequest, setLoadingRequest] = useState(false);

    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailChange = (e: any) => {
        //TODO: validations
		setEmail(e.target.value);
	};

    const handlePasswordChange = (e: any) => {
        //TODO: validations
		setPassword(e.target.value);
	};

    const { doSignUp, error, isLoading } = useSignUp();

	const handleSubmit = async (e: any) => {
        //TODO: validations

        try {
            setLoadingRequest(true);
            let user = await doSignUp({ email, password });
            console.log(user);
        } catch (err) {
            console.error('Sign Up error:', err);
        } finally {
            setLoadingRequest(false);
        }
	};
    
    return (
        <div className="gap-6 justify-center">
            <div className="w-full flex-shrink-0 overflow-hidden">
                <Card className="max-w-[400px]">
                    <CardHeader className="flex gap-3 justify-center">
                        <div className="flex flex-col">
                            <p className="text-md">Sign Up</p>
                        </div>
                    </CardHeader>
                    <Divider/>
                    <CardBody className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                            type="email"
                            label="Email"
                            placeholder="you@example.com"
                            labelPlacement="outside"
                            onChange={handleEmailChange}
                            endContent={
                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            labelPlacement="outside"
                            onChange={handlePasswordChange}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            className="max-w-xs"
                        />
                        <div className="gap-2 flex flex-col md:flex-row justify-center ">
                            <Button className="mt-4 w-full" onClick={handleSubmit} color="success" variant="faded">
                                Sign in
                            </Button> 
                            <Button className="mt-4 w-full" onClick={handleSubmit} isLoading={loadingRequest} color="success" variant="shadow">
                                Register
                            </Button> 
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}