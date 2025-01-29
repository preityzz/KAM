import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MetricCard({
  title,
  value,
  description,
  icon,
  isLoading
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-8 w-24 animate-pulse rounded bg-muted" />
        ) : (
          <>
            <div className="text-2xl font-bold text-[#084C61]">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
