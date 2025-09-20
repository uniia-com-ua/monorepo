import { Button } from "@workspace/ui/components/button";
import DrawerHello from "../business/components/DrawerHello";
import Hello from "../business/components/Hello";

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
        <Hello />
        <DrawerHello />
      </div>
    </div>
  );
}
