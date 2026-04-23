"use client";

import Link from "next/link";
import { type ReactNode, Fragment, useMemo, useState } from "react";

type StaticFaqQuestion = {
  question: string;
  answer: ReactNode; // supports line breaks + links via JSX, or plain strings
};

type StaticFaqTopic = {
  title: string;
  questions: StaticFaqQuestion[];
};

type StaticFaqContent = {
  breadcrumbHomeLabel: string;
  pageName: string;
  heading: string;
  subheading?: string;
  searchPlaceholder: string;
  noDataFoundLabel: string;
  stillNotHelpfulLabel: string;
  contactUsLabel: string;
  topics: StaticFaqTopic[];
};

const CONTENT: StaticFaqContent = {
  breadcrumbHomeLabel: "Home",
  pageName: "beOnd Assurance",
  heading: "beOnd Assurance",
  subheading:
    "Every beOnd ticket now includes complimentary travel protection, created to support you if something unexpected happens along the way. Book your trip with total confidence, knowing your journey is protected.",
  searchPlaceholder: "Search",
  noDataFoundLabel: "No data found",
  stillNotHelpfulLabel: "Still not helpful?",
  contactUsLabel: "Contact us",
  topics: [
    {
      title: "Your coverage",
      questions: [
        {
          question: "What is beOnd Assurance?",
          answer:
            "beOnd Assurance is a comprehensive travel insurance coverage offered through our partner Ceylinco Insurance and supported by leading global reinsurers including AXA XL, Swiss Life, and Odyssey. beOnd Assurance provides beOnd guests with medical, travel, baggage, and personal accident coverage worldwide.",
        },
        {
          question: "Who is covered by beOnd Assurance?",
          answer: (
            <>
              You are covered by beOnd Assurance if you hold a beOnd flight ticket purchased or issued on or after 25 November 2025.
              <br />
              <br />
              Child (CHD) and Infant (INF) tickets, and tickets purchased as part of a beOnd Holidays package are also covered under this program.
              <br />
              <br />
              Tickets purchased or issued before 25 November 2025, tickets issued as voucher redemption on complimentary basis, Industry Discount Tickets (PEP), and tickets issued media fare, are not eligible for coverage.
              <br />
              <br />
            </>
          ),
        },
        {
          question: "Does beOnd Assurance incur additional costs on my flight ticket?",
          answer:
            "No. From 25 November 2025, beOnd Assurance coverage is included as complimentary in all eligible beOnd flight ticket, as part of our commitment to deliver a seamless, premium journey for all our guests.",
        },
        {
          question: "How and when will I receive my beOnd Assurance policy?",
          answer: (
            <>Your beOnd Assurance policy will be issued by Ceylinco Insurance within the same day of completing your booking. Your Certificate of Insurance will be sent to the contact email address that you have nominated when you purchase your ticket.
              <br />
              <br />
              If you do not receive your Certificate of Insurance within 48 hours of booking your ticket, please contact beond.assurance@flybeond.com with your PNR and/or a copy of your flight ticket.
            </>
          )

        },
        {
          question: "What is the validity of my beOnd Assurance policy?",
          answer:
            "Your beOnd Assurance coverage starts on your scheduled date of departure. Your policy is valid for the duration of your journey on beOnd-operated routes. Your specific travel period will be shown on your Certificate of Insurance.",
        },
        {
          question: "Can I cancel or refund my beOnd Assurance coverage?",
          answer:
            "beOnd Assurance cannot be cancelled or refunded as it has been included as complimentary in your flight ticket.",
        },
        {
          question: "What happens to my beOnd Assurance coverage if I cancel my ticket?",
          answer:
            "If you voluntarily cancel your flight ticket, your beOnd Assurance coverage will be cancelled along with the booking/ticketing.",
        },
      ],
    },
    {
      title: "Your benefits",
      questions: [
        {
          question: "What are the benefits of beOnd Assurance?",
          answer: (
            <>beOnd Assurance has been specially crafted for premium travel, offering strong global coverage and 24/7 support.
              <br />
              <br />
              <a className="text-base text-lightorange font-medium underline cursor-pointer" target="_blank" href="/docs/Schedule-of-Coverage-v2.pdf">Click here to view the Schedule of Coverage.</a>

            </>
          )
          ,
        },
      ],
    },
    {
      title: "Journey disruptions",
      questions: [
        {
          question: "What is the difference between beOnd Assurance and the previous reprotection offered through the Commercial Promise?",
          answer:
            "With the insurance coverage provided by beOnd Assurance, you now have an added layer of confidence and trust that, in the unlikely scenario that your journey is disrupted, we are able to provide you with the reaccomodation option you prefer.",
        },
        {
          question: "What happens if my beOnd flight is cancelled?",
          answer: (
            <>
              If your beOnd flight is cancelled more than 30 days before your original departure time, we will provide you with one of the following options:
              <ol style={{ marginLeft: '20px', paddingLeft: '10px', listStyleType: 'decimal' }}>
                <li>Rebooking in another beOnd flight (date change without the penalty or fare difference)</li>
                <li>Full refund to your original form of payment</li>
              </ol>
              <br /><br />
              If your beOnd flight is cancelled between 15 to 30 days of your original departure time, we will provide you with one of the following options:
              <ol style={{ marginLeft: '20px', paddingLeft: '10px', listStyleType: 'decimal' }}>
                <li>Rebooking in another beOnd flight (date change without the penalty or fare difference)</li>
                <li>Full refund to your original form of payment</li>
              </ol>
              <br /><br />
              If your beOnd flight is cancelled between 14 days to 48 hours of your original departure time, we will provide you with one of the following options:
              <ol style={{ marginLeft: '20px', paddingLeft: '10px', listStyleType: 'decimal' }}>
                <li>Rebooking in the next available beOnd flight</li>
                <li>Full refund to your original form of payment</li>
                <li>Rebooking on Economy Class on another airline and a full refund of your disrupted sector as a voucher for future travel with beOnd</li>
                <li>Rebooking on Business Class in another airline, subject to availability and up to USD 5,000.</li>
              </ol>
            </>
          )

        },
        {
          question: "What happens if my beOnd flight is cancelled within 24 hours of departure?",
          answer: (
            <>
              If your beOnd flight is cancelled within 24 hours of your original departure time, we will provide you with one of the following options:
              <ol style={{ marginLeft: '20px', paddingLeft: '10px', listStyleType: 'decimal' }}>
                <li>Rebooking in the next available beOnd flight</li>
                <li>Full refund to your original form of payment</li>
                <li>Rebooking on Economy Class on another airline and a full refund of your disrupted sector as a voucher for future travel with beOnd</li>
                <li>Rebooking on Business Class in another airline, subject to availability and up to USD 5,000.</li>
              </ol>
              <br /><br />
              If your beOnd flight is cancelled within 24 hours of your original departure time, depending on eligibility, we will also provide you with EITHER access to our premium lounge (if your rebooked flight departs within 8 hours of your original departure time), OR overnight accommodation (if your rebooked flight departs more than 8 hours of your original departure time).
            </>
          )

        },
        {
          question: "Who can support me if my beOnd flight is disrupted?",
          answer: (
            <>
              In the event of a disruption, our 24/7 beOnd Guest Experience team remains fully committed to supporting you and your clients – from notification to rebooking, every step of the way. The team can be reached by contacting +971 (0) 4 807 6111 or{" "}
              <a
                className="text-base text-lightorange font-medium underline cursor-pointer"
                href="mailto:customersupport@flybeond.com"
              >
                customersupport@flybeond.com
              </a>
              .
            </>
          )

        }
      ],
    },
    {
      title: "In an emergency",
      questions: [
        {
          question: "Who do I contact for help during a medical or security emergency",
          answer: (
            <>
              Your beOnd Assurance coverage provides access to 24/7 travel medical and security assistance service through Swan International Assistance. In an emergency, please contact their 24/7 assistance centre at +961 9 211 662 or{" "}
              <a
                className="text-base text-lightorange font-medium underline cursor-pointer"
                href="mailto:request@swanassistance.com"
              >
                request@swanassistance.com
              </a>
              .
            </>
          )
        }
      ],
    },
    {
      title: "Submitting a claim",
      questions: [
        {
          question: "How do I submit a claim for reimbursement or compensation?",
          answer: (
            <>
              Step 1 - Prepare Your Documents
              <br />
              Depending on the claim type, gather your:
              <ul
                style={{
                  listStyleType: "circle",
                  marginLeft: "20px",
                  paddingLeft: "10px",
                }}
              >
                <li style={{ marginBottom: "6px" }}>
                  Passport, boarding pass, booking confirmation / flight ticket
                </li>
                <li style={{ marginBottom: "6px" }}>
                  Medical reports, hospital bills, prescriptions (for medical claims)
                </li>
                <li style={{ marginBottom: "6px" }}>
                  Police report (for theft, loss, assault, or accidents)
                </li>
                <li style={{ marginBottom: "6px" }}>
                  Flight delay or cancellation proof
                </li>
                <li style={{ marginBottom: "6px" }}>Receipts for expenses</li>
                <li style={{ marginBottom: "6px" }}>
                  Baggage irregularity report (PIR)
                </li>
              </ul>
              <br />
              <br />
              Step 2 - Submit Your Claim
              <br />
              Submit your claim through the contact details provided in your Certificate
              of Insurance:
              <br />
              beOnd Assurance Dedicated Customer Care
              <br />
              Email:{" "}
              <a
                className="text-base text-lightorange font-medium underline cursor-pointer"
                href="mailto:beond@ceylincoinsurance.com.mv"
              >
                beond@ceylincoinsurance.com.mv
              </a>
              <br />
              Phone: +960 732 3939
              <br />
              <br />
              Ceylinco Insurance will guide you through the process and advise if
              additional documents are required. Please include{" "}
              <a
                className="text-base text-lightorange font-medium underline cursor-pointer"
                href="mailto:beond@ceylincoinsurance.com.mv"
              >
                beond@ceylincoinsurance.com.mv
              </a>{" "}
              in your email so that we may also assist as required.
              <br />
              <br />
              Step 3 - Claim Processing
              <br />
              Ceylinco Insurance will review your submission and settle eligible claims
              as per policy terms.
            </>
          )
        },
        {
          question: "How long does the claim process take and when will I receive my compensation/refund?",
          answer:
            "Claims are processed promptly. The timeline may vary depending on claim complexity, the completeness of documents submitted, and the approval process of the insurer.",
        },
        {
          question: "I still have some questions. Who do I contact for further assistance?",
          answer:
            (
              <>
                We’re here to assist. <br /><br />
                If you have any further questions about your coverage or claim submission, please contact the beOnd Assurance Dedicated Customer Care at +960 732 3939 or beond@ceylincoinsurance.com.mv<br /><br />
                For any further support or escalation, please contact the 24/7 beOnd Guest Experience team at +971 (0) 4 807 6111 or <a className="text-base text-lightorange font-medium underline cursor-pointer" href="mailto:beond.assurance@flybeond.com">beond.assurance@flybeond.com</a>
              </>
            )
        },
      ],
    }
  ],
};

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
      focusable="false"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
      focusable="false"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      {open ? null : <line x1="12" y1="5" x2="12" y2="19" />}
    </svg>
  );
}

function normalizeForSearch(s: string) {
  return s.toLowerCase().replaceAll(/\s/g, "");
}

function answerToSearchText(answer: ReactNode): string {
  if (typeof answer === "string") return answer;
  return "";
}

function renderAnswer(answer: ReactNode) {
  if (typeof answer === "string") {
    const parts = answer.split("\n");
    return (
      <>
        {parts.map((part, idx) => (
          <Fragment key={idx}>
            {part}
            {idx < parts.length - 1 ? <br /> : null}
          </Fragment>
        ))}
      </>
    );
  }

  return answer;
}

export default function StaticFAQs() {
  const [topicIndex, setTopicIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const filteredTopics = useMemo(() => {
    const q = normalizeForSearch(searchText);
    if (q.length <= 2) return CONTENT.topics;

    return CONTENT.topics
      .filter((topic) => {
        const topicMatch = normalizeForSearch(topic.title).includes(q);
        const questionMatch =
          topic.questions.filter((dt) =>
            normalizeForSearch(dt.question).includes(q),
          ).length > 0;
        const answerMatch =
          topic.questions.filter((dt) =>
            normalizeForSearch(answerToSearchText(dt.answer)).includes(q),
          ).length > 0;
        return topicMatch || questionMatch || answerMatch;
      })
      .map((topic) => {
        const narrowed = topic.questions.filter((dt) => {
          const hay = `${dt.question}\n${answerToSearchText(dt.answer)}`;
          return normalizeForSearch(hay).includes(q);
        });

        if (narrowed.length > 0 && narrowed.length !== topic.questions.length) {
          return { ...topic, questions: narrowed };
        }
        return topic;
      });
  }, [searchText]);

  const activeTopic = filteredTopics[topicIndex];

  return (
    <div className="bg-white">
      <div className="m-auto px-4 md:w-5/6 md:px-0 xl:w-5/6 xl:pb-10 pb-24">
        <div className="py-3">
          <div className="flex">
            <Link
              href="/"
              className="text-sm font-normal text-(--color-primary-shimmer) hover:underline"
            >
              {CONTENT.breadcrumbHomeLabel} /
            </Link>
            <div className="text-sm font-semibold text-(--color-secondary-cobalt)">
              &nbsp;{CONTENT.pageName}
            </div>
          </div>
        </div>

        <div className="py-3">
          <div className="xl:w-1/2">
            <div className="xs:w-full xs:justify-center rounded-lg py-3 text-black xl:leading-tight xl:text-5xl xs:text-3xl font-light tracking-wide">
              {CONTENT.heading}
            </div>
          </div>

          <div className="xl:flex md:flex xs:block xl:justify-between md:justify-between items-start py-2 gap-4">
            <div className="text-xl text-black pr-4">
              {CONTENT.subheading ? (
                <p className="max-w-3xl text-sm leading-relaxed text-(--color-primary-shimmer) md:text-base">
                  {CONTENT.subheading}
                </p>
              ) : null}
            </div>

            <div className="text-black xl:w-1/4 relative xl:pt-0 xs:pt-4 md:w-2/5">
              <input
                type="search"
                className="w-full rounded-xl border border-black/10 bg-(--color-graymix) px-4 py-3 text-sm text-black outline-none focus:border-black/20"
                placeholder={CONTENT.searchPlaceholder}
                autoComplete="off"
                value={searchText}
                onChange={(e) => {
                  const next = e.target.value;
                  setSearchText(next);
                  setTopicIndex(0);
                  setOpenQuestions([]);
                }}
              />
              <div className="absolute right-4 top-3.5 text-(--color-primary-shimmer)">
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="xl:flex xs:flex xs:flex-wrap gap-5 md:gap-3 my-5">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, index) => {
              const active = topicIndex === index;
              return (
                <button
                  key={`${topic.title}-${index}`}
                  type="button"
                  className={[
                    "px-6 py-3 rounded-full cursor-pointer transition-colors duration-200 border",
                    active
                      ? "bg-(--color-primary-copper) text-black border-(--color-primary-copper)"
                      : "bg-(--color-secondary-linen) text-black border-black/10 hover:bg-(--color-primary-obsidian) hover:text-(--color-primary-copper) hover:border-(--color-primary-obsidian)",
                  ].join(" ")}
                  onClick={() => {
                    setTopicIndex(index);
                    setOpenQuestions([]);
                  }}
                >
                  {topic.title}
                </button>
              );
            })
          ) : (
            <div className="xl:flex md:flex xs:block justify-start items-center xl:pt-10 xs:pt-4 xl:px-0 xs:px-4 md:pt-10">
              <p className="text-2xl md:text-4xl text-black font-black">
                {CONTENT.noDataFoundLabel}
              </p>
            </div>
          )}
        </div>

        <div>
          {activeTopic?.questions?.map((q, questionIndex) => {
            const open = openQuestions.includes(questionIndex);
            return (
              <div key={`${q.question}-${questionIndex}`} className="py-2">
                <button
                  type="button"
                  className={[
                    "cursor-pointer shadow-sm p-5 flex justify-between items-center w-full rounded-xl border text-left",
                    open
                      ? "bg-(--color-lightpink) border-black/10"
                      : "bg-white border-black/10",
                  ].join(" ")}
                  onClick={() => {
                    setOpenQuestions((prev) =>
                      prev.includes(questionIndex)
                        ? prev.filter((i) => i !== questionIndex)
                        : [...prev, questionIndex],
                    );
                  }}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <div className="text-base md:text-lg font-medium text-black">
                      {q.question}
                    </div>
                    <div className="text-black">
                      <PlusMinusIcon open={open} />
                    </div>
                  </div>
                </button>

                {open ? (
                  <div className="px-5 pb-5 pt-3 text-black bg-(--color-lightpink) rounded-b-xl">
                    <div className="text-sm md:text-base leading-relaxed text-black/80 [&_a]:underline [&_a]:text-(--color-secondary-cobalt) [&_a:hover]:text-(--color-primary-copper)">
                      {renderAnswer(q.answer)}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 py-6 items-center">
          <div className="text-base text-(--color-secondary-cobalt) font-medium">
            {CONTENT.stillNotHelpfulLabel}
          </div>
          <Link
            href="/contact"
            className="text-base text-(--color-primary-copper) font-medium underline"
          >
            {CONTENT.contactUsLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

