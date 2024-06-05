import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

type FormData = {
  type: string;
  text: string;
  width: number;
  height: number;
  fontSize: number;
  fontWeight: number;
  fontColor: string;
  backgroundColor?: string;
  gradientColor1?: string;
  gradientColor2?: string;
  useGradient: boolean;
};

export default function SvgRequest() {
  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [svgUrl, setSvgUrl] = useState<string | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [useGradient, setUseGradient] = useState(false);

  useEffect(() => {
    if (!useGradient) {
      setValue("gradientColor1", "");
      setValue("gradientColor2", "");
    }
  }, [useGradient, setValue]);

  const onSubmit: SubmitHandler<FormData> = useCallback(
    async (data: any) => {
      const requestBody = {
        ...data,
        ...(useGradient
          ? { gradientColors: [data.gradientColor1, data.gradientColor2] }
          : { backgroundColor: data.backgroundColor }),
      };

      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const { url } = await response.json();
        setSvgUrl(url);
      }
    },
    [useGradient]
  );

  const generateUrl = () => {
    const baseUrl = window.location.origin;
    const data = watch();
    const queryParams: Record<string, string | number | boolean | undefined> = {
      ...data,
    };

    if (useGradient) {
      if (data.gradientColor1 && data.gradientColor2) {
        queryParams.gradientColor1 = data.gradientColor1;
        queryParams.gradientColor2 = data.gradientColor2;
      }
    } else {
      if (data.backgroundColor) {
        queryParams.backgroundColor = data.backgroundColor;
      }
    }

    const query = new URLSearchParams(
      queryParams as Record<string, string>
    ).toString();
    const url = `${baseUrl}/api/get?${query}`;
    setGeneratedUrl(url);
  };
  const copyToClipboard = async (e: React.FormEvent) => {
    e.preventDefault();

    if (generatedUrl) {
      try {
        await navigator.clipboard.writeText(generatedUrl);
        setCopySuccess("복사되었습니다!");
        setTimeout(() => setCopySuccess(""), 2000);
      } catch (err) {
        setCopySuccess("복사에 실패했습니다.");
        setTimeout(() => setCopySuccess(""), 2000);
      }
    }
  };

  return (
    <div className="custom-min-width min-h-screen flex gap-8 flex-wrap items-center justify-center bg-gray-100">
      <div className="bg-white p-3 rounded-lg shadow-lg w-full custom-max-width">
        <h1 className="text-2xl font-bold mb-6 text-center">SVG Generator</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <select
              {...register("type", { required: true })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
              <option value="fadein">FadeIn</option>
              <option value="wave">Wave</option>
              <option value="stroke">Stroke</option>
              <option value="star">Star</option>
              <option value="shadow">Shadow</option>
            </select>
            {errors.type && (
              <div className="text-red-500 text-sm">Type is required</div>
            )}
            <p className="text-gray-600 mt-1 text-sm">
              Select the shape of the SVG.
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Text</label>
            <input
              type="text"
              defaultValue={"Hi"}
              {...register("text", { required: "Text is required" })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter text"
            />
            {errors.text && (
              <div className="text-red-500 text-sm">
                {errors.text.message as string}
              </div>
            )}
            <p className="text-gray-600 mt-1 text-sm">
              Enter the text to be displayed on the SVG.
            </p>
          </div>

          <div className="flex gap-5">
            <div className="flex-1 mb-4">
              <label className="block text-gray-700">Width</label>
              <input
                type="number"
                defaultValue={"750"}
                {...register("width", {
                  required: "Width is required",
                  valueAsNumber: true,
                  min: 1,
                })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter width"
              />
              {errors.width && (
                <div className="text-red-500 text-sm">
                  {errors.width.message as string}
                </div>
              )}
              <p className="text-gray-600 mt-1 text-sm">
                Set the width of the SVG (in pixels).
              </p>
            </div>

            <div className="flex-1 mb-4">
              <label className="block text-gray-700">Height</label>
              <input
                type="number"
                defaultValue={"250"}
                {...register("height", {
                  required: "Height is required",
                  valueAsNumber: true,
                  min: 1,
                })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter height"
              />
              {errors.height && (
                <div className="text-red-500 text-sm">
                  {errors.height.message as string}
                </div>
              )}
              <p className="text-gray-600 mt-1 text-sm">
                Set the height of the SVG (in pixels).
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-1 mb-4">
              <label className="block text-gray-700">Font Size</label>
              <input
                type="number"
                defaultValue={"32"}
                {...register("fontSize", {
                  required: "Font size is required",
                  valueAsNumber: true,
                  min: 1,
                })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter font size in px"
              />
              {errors.fontSize && (
                <div className="text-red-500 text-sm">
                  {errors.fontSize.message as string}
                </div>
              )}
              <p className="text-gray-600 mt-1 text-sm">
                Set the font size of the text (in pixels).
              </p>
            </div>

            <div className="flex-1 mb-4">
              <label className="block text-gray-700">Font Weight</label>
              <input
                type="number"
                defaultValue={"800"}
                {...register("fontWeight", {
                  required: "Font weight is required",
                  valueAsNumber: true,
                  min: 100,
                  max: 900,
                })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter font weight (100-900)"
              />
              {errors.fontWeight && (
                <div className="text-red-500 text-sm">
                  {errors.fontWeight.message as string}
                </div>
              )}
              <p className="text-gray-600 mt-1 text-sm">
                Set the font weight of the text (e.g., 400 for normal, 700 for
                bold).
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-1 mb-4">
              <label className="block text-gray-700">Font Color</label>
              <Controller
                name="fontColor"
                control={control}
                defaultValue={"#000000"}
                render={({ field }) => (
                  <>
                    <input
                      type="color"
                      {...field}
                      className="border-none bg-transparent rounded-lg"
                    />
                    <input
                      type="text"
                      {...field}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="#000000"
                    />
                  </>
                )}
                rules={{ required: "Font color is required" }}
              />
              {errors.fontColor && (
                <div className="text-red-500 text-sm">
                  {errors.fontColor.message as string}
                </div>
              )}
              <p className="text-gray-600 mt-1 text-sm">
                Set the color of the text.
              </p>
            </div>

            {!useGradient && (
              <div className="flex-1 mb-4">
                <label className="block text-gray-700">Background Color</label>

                <Controller
                  name="backgroundColor"
                  control={control}
                  defaultValue={"#c9c9c9"}
                  render={({ field }) => (
                    <>
                      <input
                        type="color"
                        {...field}
                        className="border-none bg-transparent rounded-lg"
                      />
                      <input
                        type="text"
                        {...field}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="#FFFFFF"
                      />
                    </>
                  )}
                  rules={{ required: "Background color is required" }}
                />

                {errors.backgroundColor && (
                  <div className="text-red-500 text-sm">
                    {errors.backgroundColor.message as string}
                  </div>
                )}
                <p className="text-gray-600 mt-1 text-sm">
                  Set the background color of the SVG.
                </p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Use Gradient</label>
            <input
              type="checkbox"
              {...register("useGradient")}
              className="border rounded-lg"
              onChange={(e) => setUseGradient(e.target.checked)}
            />
            <p className="text-gray-600 mt-1 text-sm">
              Check to use a gradient background.
            </p>
          </div>

          {useGradient && (
            <div className="flex gap-5">
              <div className="flex-1 mb-4">
                <label className="block text-gray-700">Gradient Color 1</label>
                <Controller
                  name="gradientColor1"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="color"
                        {...field}
                        className="border-none bg-transparent rounded-lg"
                      />
                      <input
                        type="text"
                        {...field}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="#000000"
                      />
                    </>
                  )}
                  rules={{ required: "Gradient color 1 is required" }}
                />

                {errors.gradientColor1 && (
                  <div className="text-red-500 text-sm">
                    {errors.gradientColor1.message as string}
                  </div>
                )}
                <p className="text-gray-600 mt-1 text-sm">
                  Set the first color of the gradient.
                </p>
              </div>
              <div className="flex-1 mb-4">
                <label className="block text-gray-700">Gradient Color 2</label>
                <Controller
                  name="gradientColor2"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="color"
                        {...field}
                        className="border-none bg-transparent rounded-lg"
                      />
                      <input
                        type="text"
                        {...field}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="#000000"
                      />
                    </>
                  )}
                  rules={{ required: "Gradient color 2 is required" }}
                />{" "}
                {errors.gradientColor2 && (
                  <div className="text-red-500 text-sm">
                    {errors.gradientColor2.message as string}
                  </div>
                )}
                <p className="text-gray-600 mt-1 text-sm">
                  Set the second color of the gradient.
                </p>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Generate SVG
          </button>
          <button
            onClick={generateUrl}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mt-4"
          >
            Generate URL
          </button>
        </form>
      </div>
      <div className="flex flex-col">
        {generatedUrl && (
          <div className="mt-4 bg-gray-100 rounded-lg custom-max-width">
            <h2 className="text-lg font-semibold">Generated URL</h2>
            <div className="relative group">
              <div
                onClick={copyToClipboard}
                className="text-blue-500 underline break-all cursor-pointer"
                style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
              >
                {generatedUrl}
              </div>
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-black text-white rounded py-1 px-2 text-lg">
                Click to copy! / 클릭하면 복사됩니다!
              </div>
            </div>
            {copySuccess && (
              <div className="text-black-500 mt-2">{copySuccess}</div>
            )}
          </div>
        )}

        {svgUrl && (
          <div className="mt-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Generated SVG</h2>
            <Image
              src={svgUrl}
              alt="Generated SVG"
              width={Number(watch("width"))}
              height={Number(watch("height"))}
            />
          </div>
        )}
      </div>
    </div>
  );
}
