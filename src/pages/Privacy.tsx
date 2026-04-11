import { Shield, Lock, Cookie, Eye, Mail, FileText } from "lucide-react";

/* ─── Sections ─── */
const sections = [
  {
    id: "info-collected",
    icon: Eye,
    title: "Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "When you place an order or contact us, we collect your name, email address, phone number, and delivery address. This information is necessary to process your order and communicate with you.",
      },
      {
        subtitle: "Payment Information",
        text: "We do not store your payment card details. All payment processing is handled securely by Paystack, a PCI-DSS compliant payment processor. We only receive confirmation of successful payments.",
      },
      {
        subtitle: "Browsing Data",
        text: "We may collect non-personal data such as browser type, device type, pages visited, and time spent on our site. This data is collected anonymously and used to improve your shopping experience.",
      },
    ],
  },
  {
    id: "how-we-use",
    icon: FileText,
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Order Fulfilment",
        text: "Your personal information is used to process and deliver your orders, send order confirmations and delivery updates, and communicate about any issues with your order.",
      },
      {
        subtitle: "Customer Support",
        text: "We use your contact details to respond to enquiries, resolve issues, and provide product recommendations when requested.",
      },
      {
        subtitle: "Marketing (with your consent)",
        text: "If you subscribe to our newsletter, we will send you updates about new products, promotions, and skincare tips. You can unsubscribe at any time by clicking the link in any marketing email.",
      },
    ],
  },
  {
    id: "data-protection",
    icon: Shield,
    title: "How We Protect Your Data",
    content: [
      {
        subtitle: "Encryption",
        text: "Our website uses SSL/TLS encryption to protect data transmitted between your browser and our servers. All connections are secured with HTTPS.",
      },
      {
        subtitle: "Secure Payments",
        text: "Payments are processed through Paystack, which is PCI-DSS Level 1 certified — the highest level of security certification in the payments industry.",
      },
      {
        subtitle: "Limited Access",
        text: "Access to your personal data is restricted to authorised team members who need it to fulfil your orders and provide customer support.",
      },
    ],
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies",
    content: [
      {
        subtitle: "Essential Cookies",
        text: "We use essential cookies to keep your shopping cart active during your browsing session and to remember your preferences. These are necessary for the site to function.",
      },
      {
        subtitle: "Analytics Cookies",
        text: "We may use analytics tools to understand how visitors interact with our site. This data is anonymised and helps us improve the shopping experience.",
      },
      {
        subtitle: "Managing Cookies",
        text: "You can control and delete cookies through your browser settings. Please note that disabling essential cookies may affect your ability to use certain features of our site.",
      },
    ],
  },
  {
    id: "your-rights",
    icon: Lock,
    title: "Your Rights",
    content: [
      {
        subtitle: "Access & Correction",
        text: "You have the right to request access to the personal data we hold about you and to ask for corrections if any information is inaccurate.",
      },
      {
        subtitle: "Deletion",
        text: "You can request that we delete your personal data. We will comply unless we are legally required to retain certain information (e.g., for tax or accounting purposes).",
      },
      {
        subtitle: "Unsubscribe",
        text: "You can opt out of marketing emails at any time. Click the unsubscribe link in any email or contact us directly.",
      },
    ],
  },
  {
    id: "third-parties",
    icon: Mail,
    title: "Third Parties",
    content: [
      {
        subtitle: "Payment Processing",
        text: "We use Paystack to process payments. Paystack's privacy policy governs how they handle your payment information.",
      },
      {
        subtitle: "Delivery Partners",
        text: "We share your name, phone number, and delivery address with our logistics partners solely for the purpose of delivering your order.",
      },
      {
        subtitle: "No Selling of Data",
        text: "We will never sell, rent, or trade your personal information to third parties for marketing purposes.",
      },
    ],
  },
];

const Privacy = () => {
  return (
    <div className="bg-gnade-cream min-h-screen">
      {/* ═══════ Header ═══════ */}
      <div className="bg-white border-b border-black/5 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] tracking-[2px] uppercase text-gnade-dark/50">
            Legal
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-gnade-black mt-1">
            Privacy <em className="italic text-gnade-light">Policy</em>
          </h1>
          <p className="text-[13px] text-gnade-black/40 font-light mt-3">
            Last updated: April 2026
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* ── Table of Contents (sidebar) ── */}
        <nav className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24">
            <p className="text-[10px] tracking-[2px] uppercase text-gnade-dark/40 mb-4">
              Contents
            </p>
            <div className="flex flex-col gap-2.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-[12px] text-gnade-black/50 hover:text-gnade-dark transition-colors duration-200 font-light"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* ── Main Content ── */}
        <div className="lg:col-span-3 flex flex-col gap-12">
          {/* Intro */}
          <div className="bg-white rounded-sm p-7">
            <p className="text-[14px] text-gnade-black/60 leading-relaxed font-light">
              At GNADE Essential Skincare & Spa, we are committed to protecting
              your privacy. This policy explains how we collect, use, and
              safeguard your personal information when you visit our website and
              make purchases. By using our site, you agree to the practices
              described below.
            </p>
          </div>

          {/* Sections */}
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.id} id={section.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-gnade-pale flex items-center justify-center flex-shrink-0">
                    <Icon
                      size={16}
                      strokeWidth={1.5}
                      className="text-gnade-dark"
                    />
                  </div>
                  <h2 className="font-serif text-xl md:text-2xl font-semibold text-gnade-black">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-5">
                  {section.content.map((block) => (
                    <div key={block.subtitle} className="bg-white rounded-sm p-6">
                      <h3 className="text-[13px] font-medium text-gnade-black mb-2 tracking-[0.3px]">
                        {block.subtitle}
                      </h3>
                      <p className="text-[13px] text-gnade-black/55 leading-relaxed font-light">
                        {block.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Contact for Privacy */}
          <div className="bg-gnade-dark rounded-sm p-8 text-center">
            <Shield
              size={28}
              strokeWidth={1}
              className="text-white/50 mx-auto mb-4"
            />
            <h3 className="font-serif text-lg font-semibold text-white mb-2">
              Privacy Questions?
            </h3>
            <p className="text-[12px] text-white/50 font-light mb-4 max-w-md mx-auto">
              If you have any questions about this privacy policy or want to
              exercise your data rights, please contact us.
            </p>
            <a
              href="mailto:hello@gnade.ng"
              className="inline-block text-[11px] tracking-[1.5px] uppercase text-white border-b border-white/30 pb-0.5 hover:border-white/60 transition-colors duration-200"
            >
              hello@gnade.ng
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
