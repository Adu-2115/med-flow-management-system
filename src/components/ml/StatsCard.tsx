
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number | ReactNode;
  description?: string;
  className?: string;
  footer?: ReactNode;
}

const StatsCard = ({
  title,
  value,
  description,
  className,
  footer,
}: StatsCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
        </div>
      </CardContent>
      {footer && <CardFooter className="border-t bg-muted/50 p-2">{footer}</CardFooter>}
    </Card>
  );
};

export default StatsCard;
