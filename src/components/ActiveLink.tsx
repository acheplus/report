import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import { cloneElement, ReactElement } from 'react'

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    shouldMatchExactHref: boolean;
}

export function ActiveLink({ children, shouldMatchExactHref=false,
    ...rest}: ActiveLinkProps) {

    const { asPath } = useRouter()

    let isActive = false

    if(shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
        isActive = true
    }

    if(!shouldMatchExactHref && (asPath.startsWith(String(rest.href)) || 
        asPath.startsWith(String(rest.as))) ) {
        isActive = true
    }

    return (
        <Link {...rest}>
            {cloneElement(children, {
                bgColor: isActive ? '#efefef' : '',
                color: isActive ? '#1b9b4e' : '',
                borderRadius: isActive ? '30px 0 0 30px' : '',
            })}
        </Link>
    )
}