import Head from "next/head";
import Link from "next/link";
import { policy } from "./partial/data";
import P from "../partial/P";

const Section = ({ id, title, content, bullets, footer, contacts }) => {
  return (
    <div>
      <h2 className="font-18 font-semibold text-gray-800 mb-3">
        {id}. {title}
      </h2>

      {content &&
        content.map((paragraph, idx) => (
          <P key={idx} className="mb-2">
            {paragraph}
          </P>
        ))}

      {bullets && bullets.length > 0 && (
        <ul className="list-disc pl-6 text-gray-text font-16 space-y-1">
          {bullets.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
      )}

      {contacts && contacts.length > 0 && (
        <ul className="text-green-default font-16 space-y-1">
          {contacts.map((contact, idx) => (
            <li key={idx}>{contact}</li>
          ))}
        </ul>
      )}

      {footer && <P className="mt-2">{footer}</P>}
    </div>
  );
};

export default function Index() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Nuehva</title>
        <meta name="description" content="Privacy Policy for Nuehva services" />
      </Head>
      <div className="container">
        <div className="py-16 2xl:py-24">
          <h1 className="font-26 font-bold text-center text-gray-800 mb-8">
            Privacy Policy
          </h1>

          <div className="space-y-8">
            <div>
              <p className="text-primary-dark mb-4">
                <span className="font-semibold">Effective Date:</span>{" "}
                <span className="text-gray-text">
                  {policy.effectiveDate}
                </span>
              </p>

              <p className="text-gray-text font-16 mb-2">
                {policy.introduction.text}{" "}
                <Link
                  href={policy.introduction.website}
                  className="text-green-default hover:underline"
                >
                  {policy.introduction.website}
                </Link>{" "}
                {policy.introduction.continuation}
              </p>
            </div>

            {policy.sections.map((section) => (
              <Section
                key={section.id}
                id={section.id}
                title={section?.title}
                content={section?.content}
                bullets={section?.bullets}
                footer={section?.footer}
                contacts={section?.contacts}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
