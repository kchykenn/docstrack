import { ImgHTMLAttributes } from 'react';

export default function AppLogoIconBG(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/assets/img/background/back3.jpg"
            alt="Document Background"
            className="object-cover w-full h-full"
            {...props}
        />
    );
}
