import { Suspense, lazy } from "react";

interface HeaderTitle {
  headerInfo: HeaderInfo;
}

interface HeaderInfo {
  icon: string;
  title: string;
}

export default function HeaderTitle({ headerInfo }: HeaderTitle) {
  const { title, icon } = headerInfo;
  const IconTitle = {
    clock: lazy(() => import("@phosphor-icons/react/Alarm")),
    camera: lazy(() => import("@phosphor-icons/react/Camera")),
    qrcode: lazy(() => import("@phosphor-icons/react/QrCode")),
    notes: lazy(() => import("@phosphor-icons/react/PencilLine")),
    review: lazy(() => import("@phosphor-icons/react/NotePencil")),
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const IconComponent = IconTitle[icon];
  return (
    <div className="flex flex-row items-center gap-4 bg-transparent">
      <Suspense fallback={<div>Carregando...</div>}>
        {IconComponent && (
          <IconComponent color="#fff" size={28} weight="fill" />
        )}
      </Suspense>
      <h2 className="text-xl leading-relaxed bg-transparent">{title}</h2>
    </div>
  );
}
