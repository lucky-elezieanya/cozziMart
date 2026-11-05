
import { Gift, Headset, ShieldCheck, Truck } from "lucide-react";
import React from "react";

const benefits = [
  {
    title: "Free Shipping",
    description: "On orders over ₦50,000",
    icon: Truck,
  },
  {
    title: "Secure Payments",
    description: "Shop with confidence",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description: "We're here to help",
    icon: Headset,
  },
  {
    title: "Easy Returns",
    description: "Hands-free returns",
    icon: Gift,
  },
];

const Benefits = () => {
  return (
    <section
      id="benefits"
      className="w-full bg-primary/10 px-4 py-5 sm:px-8 lg:px-15"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-x-4 gap-y-6 lg:flex lg:justify-between lg:gap-4">

        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon;

          return (
            <React.Fragment key={benefit.title}>
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex w-9 shrink-0 items-center justify-center sm:w-10">
                  <Icon className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
                </div>

                <div className="flex min-w-0 flex-col gap-0">
                  <h3 className="font-heading text-xs font-bold leading-tight text-foreground sm:text-sm">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-foreground/75 sm:text-[11px]">
                    {benefit.description}
                  </p>
                </div>
              </div>

              {/* Desktop Vertical Separator */}
              {idx !== benefits.length - 1 && (
                <div className="hidden h-9 w-px shrink-0 bg-primary/50 lg:block" />
              )}
            </React.Fragment>
          );
        })}

      </div>
    </section>
  );
};

export default Benefits;
