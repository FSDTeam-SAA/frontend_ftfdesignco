import { Card, CardContent } from "@/components/ui/card";
import { SalesStatsCardProps } from "@/lib/types";

export const SalesStatsCard: React.FC<SalesStatsCardProps> = ({
  title,
  value,
  icon,
  className = "bg-[#035F8A] text-white",
}) => {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};
