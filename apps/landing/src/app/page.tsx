import { Button } from "@workspace/ui/components/base/button";
import DrawerHello from "../business/components/DrawerHello";
import Hello from "../business/components/Hello";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center space-y-8">
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <h1 className="text-2xl font-bold">Hello World</h1>
      </div>
    </div>
    );
  }
