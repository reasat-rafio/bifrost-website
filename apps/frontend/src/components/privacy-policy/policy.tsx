import { PortableText } from "utils/sanity";
import { Serializers } from "./serializer";
import { Section } from "components/ui/section";

interface PolicyProps {
  policy: any;
}

export const Policy: React.FC<PolicyProps> = ({ policy }) => {
  return (
    <Section borderBottom={false} className="prose-lg prose-lime max-w-none">
      <PortableText blocks={policy} serializers={Serializers} />
    </Section>
  );
};
