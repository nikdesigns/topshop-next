'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & { className?: string }) {
  return <AccordionPrimitive.Root className={cn('ui-accordion', className)} {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item> & { className?: string }) {
  return <AccordionPrimitive.Item className={cn('ui-accordion-item', className)} {...props} />;
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & { className?: string }) {
  return (
    <AccordionPrimitive.Header className="ui-accordion-header">
      <AccordionPrimitive.Trigger className={cn('ui-accordion-trigger', className)} {...props}>
        <span>{children}</span>
        <ChevronDown className="ui-accordion-chevron" aria-hidden="true" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content> & { className?: string }) {
  return (
    <AccordionPrimitive.Content className={cn('ui-accordion-content', className)} {...props}>
      <div className="ui-accordion-content-inner">{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
