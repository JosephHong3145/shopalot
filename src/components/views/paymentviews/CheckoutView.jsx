import { PageLayout } from "./components/design/PageLayout";
import { PaymentView } from "./PaymentView";
import React from "react";

export function CheckoutView() {
  return (
    <div>
      <PageLayout>
        <PaymentView />
      </PageLayout>
    </div>
  );
}
