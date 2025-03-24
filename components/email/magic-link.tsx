import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";
import { APP_NAME } from "@/lib/constants";

interface MagicLinkEmailProps {
  url: string;
}

const baseStyles = {
  main: {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
  container: {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "580px",
  },
  logo: {
    margin: "0 auto",
    borderRadius: "1rem",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "32px",
    color: "#3aa5ed",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#000000",
    margin: "16px 0",
  },
  btnContainer: {
    textAlign: "center" as const,
    margin: "32px 0",
  },
  button: {
    backgroundColor: "#3aa5ed",
    borderRadius: "0.5rem",
    color: "#ffffff",
    padding: "12px 24px",
    textDecoration: "none",
    display: "inline-block",
    fontWeight: "500",
    fontSize: "16px",
  },
  footer: {
    fontSize: "14px",
    color: "#6B7280",
    marginTop: "32px",
    textAlign: "center" as const,
  },
  link: {
    color: "#3aa5ed",
    textDecoration: "underline",
    fontSize: "14px",
    wordBreak: "break-all" as const,
  },
  hr: {
    borderColor: "#E5E7EB",
    margin: "24px 0",
  },
};

export const MagicLinkEmail = ({ url }: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Connectez-vous à votre compte {APP_NAME} avec ce lien</Preview>
    <Body style={baseStyles.main}>
      <Container style={baseStyles.container}>
        <Img
          src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.png`}
          width={96}
          height={96}
          alt={APP_NAME}
          style={baseStyles.logo}
        />

        <Text style={baseStyles.heading}>Connexion à votre compte</Text>

        <Text style={baseStyles.paragraph}>Bonjour,</Text>
        <Text style={baseStyles.paragraph}>
          Vous avez demandé un lien de connexion pour vous connecter à votre
          compte. Cliquez sur le bouton ci-dessous pour vous connecter :
        </Text>

        <Section style={baseStyles.btnContainer}>
          <Button style={baseStyles.button} href={url}>
            Se connecter
          </Button>
        </Section>

        <Text style={baseStyles.paragraph}>
          Si vous avez des difficultés à cliquer sur le bouton, copiez et collez
          cette URL dans votre navigateur web :
        </Text>

        <Link href={url} style={baseStyles.link}>
          {url}
        </Link>

        <Hr style={baseStyles.hr} />

        <Text style={baseStyles.footer}>
          Si vous n&apos;avez pas demandé cet e-mail, vous pouvez l&apos;ignorer
          en toute sécurité.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default MagicLinkEmail;
