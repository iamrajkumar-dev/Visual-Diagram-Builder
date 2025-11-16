import type { JSX } from "react";

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: "✨",
    title: "Easy to Use",
    description: "Drag and drop interface for creating diagrams",
  },
  {
    id: 2,
    icon: "🔗",
    title: "Connect Ideas",
    description: "Link nodes together to visualize relationships",
  },
  {
    id: 3,
    icon: "👥",
    title: "Collaborate",
    description: "Share diagrams with editors and viewers",
  },
];

const FeaturesList = (): JSX.Element => {
  return (
    <div className="login-features">
      {features.map(({ icon, title, description, id }) => (
        <div key={id} className="feature-item">
          <div className="feature-icon">{icon}</div>
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesList;
