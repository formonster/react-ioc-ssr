import React from 'react';
import { Header, Footer } from '@/components';

interface MainProps {
    children: React.ReactNode;
}

function Main({ children }: MainProps) {

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Main;