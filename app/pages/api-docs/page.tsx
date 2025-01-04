'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function ApiDocs() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-[#084C61]">
            API Documentation
          </h1>
          <p className="text-lg text-gray-600">Restaurant CRM API Reference</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
          <SwaggerUI
            url="/api/docs"
            docExpansion="list"
            defaultModelsExpandDepth={-1}
            onComplete={() => setIsLoading(false)}
            persistAuthorization={true}
            tryItOutEnabled={true}
          />
        </CardContent>
      </Card>
    </div>
  );
}
