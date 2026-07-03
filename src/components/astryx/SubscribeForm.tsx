import { Button } from '@astryxdesign/core/Button';
import { Section } from '@astryxdesign/core/Section';
import { HStack, StackItem, VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { TextInput } from '@astryxdesign/core/TextInput';
import { useState } from 'react';

type HiddenField = {
    name: string;
    value: string;
};

type SubscribeFormProps = {
    action: string;
    title?: string;
    description?: string;
    emailFieldName?: string;
    hiddenFields?: HiddenField[];
    honeypotFieldName?: string;
};

export default function SubscribeForm({ action, title, description, emailFieldName = 'email', hiddenFields = [], honeypotFieldName }: SubscribeFormProps) {
    const [email, setEmail] = useState('');

    return (
        <Section variant="muted" padding={6}>
            <VStack gap={4}>
                {title && <Heading level={2}>{title}</Heading>}
                {description && (
                    <Text as="p" color="secondary">
                        {description}
                    </Text>
                )}
                <form action={action} method="post" target="_blank" name="subscribe-form">
                    <HStack gap={3} wrap="wrap" vAlign="end">
                        <StackItem size="fill">
                            <TextInput
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={setEmail}
                                htmlName={emailFieldName}
                                placeholder="name@example.com"
                                isRequired
                            />
                        </StackItem>
                        {hiddenFields.map((field) => (
                            <input key={field.name} type="hidden" name={field.name} value={field.value} />
                        ))}
                        {honeypotFieldName && (
                            <input className="visually-hidden" type="text" name={honeypotFieldName} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                        )}
                        <Button type="submit" label="Subscribe" variant="primary" />
                    </HStack>
                </form>
            </VStack>
        </Section>
    );
}
