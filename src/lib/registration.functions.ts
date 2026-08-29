import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { registrationSchema, type RegistrationResult } from "./registration-schema";

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => registrationSchema.parse(data))
  .handler(async ({ data }): Promise<RegistrationResult> => {
    const { persistRegistration, rateLimit } = await import("./registration.server");

    // Honeypot: bots preenchem o campo escondido.
    if (data.website) {
      return { status: "received" };
    }

    const request = getRequest();
    const ip =
      request?.headers.get("cf-connecting-ip") ??
      request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (!rateLimit(ip)) {
      return {
        status: "error",
        message: "Muitas tentativas em pouco tempo. Aguarde um instante e tente novamente.",
      };
    }

    return persistRegistration(data);
  });
