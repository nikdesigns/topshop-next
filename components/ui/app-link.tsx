import NextLink from 'next/link';

type AppLinkProps = React.ComponentProps<typeof NextLink>;

export function AppLink({ prefetch = false, ...props }: AppLinkProps) {
  return <NextLink prefetch={prefetch} {...props} />;
}
