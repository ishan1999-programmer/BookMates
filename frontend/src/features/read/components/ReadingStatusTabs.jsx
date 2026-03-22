import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReadingStatusTabs = () => {
  return (
    <Tabs defaultValue="want to read">
      <TabsList className="flex">
        <TabsTrigger
          className="flex-1 flex gap-2 items-center"
          value="want to read"
        >
          Want To Read
        </TabsTrigger>
        <TabsTrigger className="flex-1 flex gap-2 items-center" value="reading">
          Currently Reading
        </TabsTrigger>
        <TabsTrigger className="flex-1 flex gap-2 items-center" value="read">
          Read
        </TabsTrigger>
      </TabsList>
      <TabsContent value="want to read">want to read.....</TabsContent>
      <TabsContent value="reading">reading...</TabsContent>
      <TabsContent value="read">read...</TabsContent>
    </Tabs>
  );
};

export default ReadingStatusTabs;
