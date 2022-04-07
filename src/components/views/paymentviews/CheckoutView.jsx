import { Container } from "@mui/material";
import { PageLayout } from "./components/design/PageLayout";
import { PaymentView } from "./PaymentView";
import React from "react";

export function CheckoutView() {
  return (
    <Container maxWidth="lg">
      <PageLayout>
        <PaymentView />
      </PageLayout>
    </Container>
  );
}
