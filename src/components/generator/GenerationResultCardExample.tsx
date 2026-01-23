// 使用示例：如何在父组件中使用更新后的 GenerationResultCard

import GenerationResultCard from "./GenerationResultCard";
import { useRouter } from "next/navigation";

export default function GenerationResultCardExample() {
  const router = useRouter();

  // 示例数据
  const sampleUrls = [
    "/sample-image-1.jpg",
    "/sample-image-2.jpg",
    "/sample-image-3.jpg",
    "/sample-image-4.jpg"
  ];

  const handleUpgrade = () => {
    // 跳转到定价页面
    router.push("/pricing");
  };

  const handleRegenerate = () => {
    // 重新生成逻辑
    console.log("Regenerating...");
  };

  const handleDelete = () => {
    // 删除逻辑
    console.log("Deleting...");
  };

  return (
    <div className="p-6 bg-[#050505] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 免费用户 - 显示付费功能引导 */}
        <GenerationResultCard
          urls={sampleUrls}
          prompt="A beautiful anime girl with long flowing hair, standing in a magical forest with glowing butterflies"
          style="Anime"
          ratio="1:1"
          isPro={false} // 免费用户
          onUpgrade={handleUpgrade}
          onRegenerate={handleRegenerate}
          onDelete={handleDelete}
        />

        {/* Pro用户 - 不显示付费功能引导 */}
        <GenerationResultCard
          urls={sampleUrls}
          prompt="A cyberpunk warrior in neon-lit city streets, digital art style"
          style="Cyberpunk"
          ratio="16:9"
          isPro={true} // Pro用户
          onUpgrade={handleUpgrade}
          onRegenerate={handleRegenerate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}