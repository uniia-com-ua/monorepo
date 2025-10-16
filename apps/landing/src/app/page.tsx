import { Button } from "@workspace/ui/components/button";
import DrawerHello from "../business/components/DrawerHello";
import Hello from "../business/components/Hello";

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center" style={{ backgroundImage: "url('https://cms.uniia.com.ua/uploads/large_main_image_62cce1a3bf.webp')" }}>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
          <Button>Розпочати</Button>
          <Button variant="glass">Дізнатися більше</Button>
          <Button variant="white">Про нас</Button>
          <Hello />
          <DrawerHello />
        </div>
      </div>
    );
  }
