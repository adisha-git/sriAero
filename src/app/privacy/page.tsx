import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How SriAero collects, uses and protects personal information submitted through this website.",
  path: "/privacy/",
});

// PLACEHOLDER – have this reviewed against your actual practices and PIPEDA / Alberta PIPA before launch.
const updated = "October 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero label={`Privacy · Updated ${updated}`} title="Privacy Policy" intro="How we handle the information you send us." />
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x max-w-3xl space-y-10 text-slate [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-navy [&_p]:mt-3 [&_li]:mt-2 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
          <div>
            <h2>Who we are</h2>
            <p>
              {site.legalName} (&ldquo;SriAero&rdquo;, &ldquo;we&rdquo;) provides mobile aircraft detailing services from{" "}
              {site.address.city}, {site.address.regionName}. This policy explains how we handle personal information
              collected through this website, in line with Canada&apos;s Personal Information Protection and Electronic
              Documents Act (PIPEDA) and Alberta&apos;s Personal Information Protection Act (PIPA).
            </p>
          </div>
          <div>
            <h2>What we collect</h2>
            <p>When you request a quote or contact us, we collect what you give us:</p>
            <ul>
              <li>Your name, company, phone number and email address</li>
              <li>Aircraft type or registration, home airport, services wanted and preferred date</li>
              <li>Anything else you include in your message</li>
            </ul>
            <p>We don&apos;t use advertising trackers on this site.</p>
          </div>
          <div>
            <h2>How we use it</h2>
            <ul>
              <li>To respond to your enquiry, prepare a quote and schedule work</li>
              <li>To deliver and invoice the services you book</li>
              <li>To keep service records for your aircraft, if you ask us to</li>
            </ul>
            <p>We don&apos;t sell or rent your personal information, and we don&apos;t use it for unrelated marketing without your consent.</p>
          </div>
          <div>
            <h2>Service providers</h2>
            <p>
              Quote requests are delivered to us through a third-party form service (for example Formspree or Netlify),
              which may store and process data outside Canada. These providers handle data only to deliver the form to
              us.
            </p>
          </div>
          <div>
            <h2>Retention and security</h2>
            <p>
              We keep enquiry information only as long as needed for the purposes above or as required by law, and
              protect it with reasonable administrative and technical safeguards.
            </p>
          </div>
          <div>
            <h2>Your choices</h2>
            <p>
              You can ask to see, correct or delete the personal information we hold about you at any time by emailing{" "}
              <a href={`mailto:${site.contact.email}`} className="text-horizon underline">
                {site.contact.email}
              </a>
              .
            </p>
          </div>
          <div>
            <h2>Changes</h2>
            <p>We may update this policy from time to time. The date at the top shows when it last changed.</p>
          </div>
        </div>
      </section>
    </>
  );
}
