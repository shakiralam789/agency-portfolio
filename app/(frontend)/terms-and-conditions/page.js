import Head from "next/head";
import Link from "next/link";
import { termsData } from "./partial/data";
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

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Nuehva</title>
        <meta
          name="description"
          content="Terms and Conditions for Nuehva services"
        />
      </Head>
      <div className="container">
        <div className="py-16 2xl:py-24">
          <h1 className="font-26 font-bold text-center text-gray-800 mb-8">
            Terms and Conditions
          </h1>

          <div className="space-y-8">
            <div>
              <p className="text-primary-dark mb-4">
                <span className="font-semibold">Effective Date:</span>{" "}
                <span className="text-gray-text">
                  {termsData.effectiveDate}
                </span>
              </p>

              <p className="text-gray-text font-16 mb-2">
                {termsData.introduction.text}{" "}
                <Link
                  href={termsData.introduction.website}
                  className="text-green-default hover:underline"
                >
                  {termsData.introduction.website}
                </Link>{" "}
                {termsData.introduction.continuation}
              </p>
            </div>

            {termsData.sections.map((section) => (
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
