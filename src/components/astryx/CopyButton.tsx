import { Button } from '@astryxdesign/core/Button';
import { Icon } from '@astryxdesign/core/Icon';
import { useState } from 'react';

type CopyButtonProps = {
    value: string;
};

export default function CopyButton({ value }: CopyButtonProps) {
    const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setStatus('copied');
        } catch {
            setStatus('failed');
        }
        window.setTimeout(() => setStatus('idle'), 2500);
    };

    const label = status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy unavailable' : 'Share';

    return <Button label={label} variant="secondary" size="md" icon={<Icon icon={status === 'copied' ? 'check' : 'copy'} size="sm" />} onClick={copy} />;
}
