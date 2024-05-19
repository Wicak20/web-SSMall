import { Navbar } from '../commponen/Navbar';
import { NewProducts } from '../commponen/NewProduct';
import { MainProducts } from '../commponen/MainProduct';

export function Home() {
  return (
    <div>
      <div className="bg-[#40BFFF]">
        <section>
          <Navbar />
        </section>
      </div>
      <section className="">
        <NewProducts />
      </section>
      <section className="">
        <MainProducts />
      </section>
    </div>
  );
}
