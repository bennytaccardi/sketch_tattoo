import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm sm:max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4 gap-2 sm:gap-3">
            <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-destructive flex-shrink-0" />
            <h1 className="text-xl sm:text-2xl font-bold text-foreground text-center sm:text-left">
              404 Pagina Non Trovata
            </h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground text-center sm:text-left">
            Hai dimenticato di aggiungere la pagina al router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
