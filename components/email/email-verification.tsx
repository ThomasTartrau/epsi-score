import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Img,
  Text,
  Button,
  Section,
  Link,
  Hr,
} from "@react-email/components";
import { APP_NAME } from "@/lib/constants";

interface EmailVerificationProps {
  name: string;
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
    color: "#7C3AED",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#000000",
  },
  btnContainer: {
    textAlign: "center" as const,
    margin: "32px 0",
  },
  button: {
    backgroundColor: "#7C3AED",
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
    color: "#7C3AED",
    textDecoration: "underline",
    fontSize: "14px",
    wordBreak: "break-all" as const,
  },
  hr: {
    borderColor: "#E5E7EB",
    margin: "24px 0",
  },
};

export const EmailVerification = ({ name, url }: EmailVerificationProps) => (
  <Html>
    <Head />
    <Preview>Vérifiez votre adresse e-mail pour {APP_NAME}</Preview>
    <Body style={baseStyles.main}>
      <Container style={baseStyles.container}>
        <Img
          src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.png`}
          width={96}
          height={96}
          alt={APP_NAME}
          style={baseStyles.logo}
        />

        <Text style={baseStyles.heading}>Vérifiez votre adresse e-mail</Text>

        <Text style={baseStyles.paragraph}>Bonjour {name},</Text>
        <Text style={baseStyles.paragraph}>
          Merci de vous être inscrit à {APP_NAME}. Pour compléter votre
          inscription et vérifier votre adresse e-mail, veuillez cliquer sur le
          bouton ci-dessous.
        </Text>

        <Section style={baseStyles.btnContainer}>
          <Button style={baseStyles.button} href={url}>
            Vérifier l&apos;adresse e-mail
          </Button>
        </Section>

        <Text style={baseStyles.paragraph}>
          Si le bouton ci-dessus ne fonctionne pas, vous pouvez également
          vérifier votre e-mail en copiant et collant le lien suivant dans votre
          navigateur :
        </Text>

        <Link href={url} style={baseStyles.link}>
          {url}
        </Link>

        <Hr style={baseStyles.hr} />

        <Text style={baseStyles.footer}>
          Si vous n&apos;avez pas créé de compte avec {APP_NAME}, vous pouvez
          ignorer cet e-mail en toute sécurité.
        </Text>
      </Container>
    </Body>
  </Html>
);
