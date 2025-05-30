
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UsageStats from '@/components/dashboard/UsageStats';
import UploadBox from '@/components/dashboard/UploadBox';
import FieldsConfig from '@/components/dashboard/FieldsConfig';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect from the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome{user?.name ? `, ${user.name}` : ''}!</h1>
          <p className="text-muted-foreground">
            Manage your documents and extraction requests.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Your Usage</h2>
          <UsageStats />
          
          {user?.subscription === 'free' && (
            <div className="mt-6 p-4 border rounded-md bg-accent">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">Need more capacity?</h3>
                  <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
                    Upgrade to Pro for increased limits and additional features.
                  </p>
                </div>
                <Link to="/pricing">
                  <Button>Upgrade to Pro</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Fields Configuration</h2>
          <FieldsConfig />
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Document Processing</h2>
          <Tabs defaultValue="upload">
            <TabsList>
              <TabsTrigger value="upload">Upload & Extract</TabsTrigger>
              <TabsTrigger value="history">Processing History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-6">
              <UploadBox />
            </TabsContent>
            
            <TabsContent value="history" className="mt-6">
              <div className="text-center py-16 border rounded-md bg-muted/20">
                <h3 className="text-lg font-medium mb-2">No processing history yet</h3>
                <p className="text-muted-foreground mb-4">
                  Upload and process documents to see them here.
                </p>
                <Button variant="outline">Upload Documents</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
