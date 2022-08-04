import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps{
    children: JSX.Element | JSX.Element[];
    selector: string;
}
const ClientOnlyPortal: React.FC<PortalProps> = ({ children, selector }) => {
    const ref = useRef<HTMLElement | null>(null);
    const [mount, setMount] = useState(false);

    useEffect(() => {
        ref.current  = document.getElementById(selector);
        setMount(true);
    }, [selector]);

    return mount ? createPortal(children, ref.current!) : null;
}

export default ClientOnlyPortal;