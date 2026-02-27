import { formatTimestamp } from "../../utils/helperFunction";
import ButtonCta from "../../ui/ButtonCta";
import defaultBlogImage from "../../assets/logImages/blog-default-img.avif";

interface FeedCardProps {
  index: number;
  objectId: string;
  title: string;
  created: number | null;
  updated: number | null;
  author: string;
  content: string;
}

function FeedCard({
  index,
  objectId,
  title,
  created,
  updated,
  author,
  content,
}: FeedCardProps) {
  return (
    <div
      className={`flex  flex-col col-span-2 md:col-span-1 justify-between px-10  mb-15 md:mb-20 ${(index + 1) % 2 === 0 ? "md:border-l-[0.5px] border-stone-600" : ""}`}>
      <div>
        <div className="w-full bg-stone-900/50 rounded-lg h-50 overflow-hidden">
          <img
            src={defaultBlogImage}
            alt="default-blog-image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-5 text-xs sm:text-sm py-4 text-stone-400 font-light">
          <p>⦿ {author}</p>
          <p>{formatTimestamp(created, updated)}</p>
        </div>
      </div>

      <div className="border-b-[0.5px] md:border-none pb-10 md:py-0 border-stone-600">
        <h2 className="text-xl md:text-2xl">{title} </h2>
        <p className="flex gap-5 text-sm py-4 text-stone-400 font-light">
          {content.length >= 200 && content.length <= 250
            ? content.slice(0, 200)
            : content.slice(0, 100)}
          ...
        </p>
        <ButtonCta to={`${objectId}`}>Read</ButtonCta>
      </div>
    </div>
  );
}

export default FeedCard;
