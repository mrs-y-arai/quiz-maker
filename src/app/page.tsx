import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default function Home() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="mb-4 text-center text-2xl font-bold">
          クイズメーカーさん
        </h1>
        <p className="mb-4 text-center text-base font-bold">
          クイズを作って、みんなに共有してみよう！
        </p>
        <Link className="mx-auto block w-fit" href="/maker" prefetch={true}>
          <Button>クイズを作る</Button>
        </Link>
      </div>
      <section className="py-4">
        <h2 className="mb-3 text-center text-lg font-bold">
          今まで作ったクイズたち
        </h2>
        <ul className="grid grid-cols-1">
          <li className="border-b">
            <Link
              className="block bg-primary/5 p-4"
              href="/quiz/1"
              prefetch={true}
            >
              クイズ1
            </Link>
          </li>
          <li className="border-b">
            <Link className="block p-4" href="/quiz/1" prefetch={true}>
              クイズ2
            </Link>
          </li>
          <li className="border-b">
            <Link
              className="block bg-primary/5 p-4"
              href="/quiz/1"
              prefetch={true}
            >
              クイズ3
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
