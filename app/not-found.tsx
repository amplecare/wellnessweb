import { ButtonLink } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Section';

export default function NotFound() {
  return (
    <Section tone="paper" size="roomy">
      <Container width="narrow">
        <div className="flex flex-col items-center text-center">
          <p className="nums font-display text-display-2xl text-lumen-soft">404</p>
          <h1 className="mt-4 text-display-lg">We couldn&rsquo;t find that page</h1>
          <p className="mt-5 max-w-md text-lead text-lumen-soft">
            The page may have moved. You can head back to the homepage, or go straight to what most
            people come here for.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg" withArrow className="w-full sm:w-auto">
              Back to homepage
            </ButtonLink>
            <ButtonLink
              href="/book-consultation"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Book a free consultation
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
