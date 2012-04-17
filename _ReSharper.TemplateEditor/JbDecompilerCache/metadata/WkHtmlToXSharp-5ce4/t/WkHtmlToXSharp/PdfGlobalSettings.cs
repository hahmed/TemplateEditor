// Type: WkHtmlToXSharp.PdfGlobalSettings
// Assembly: WkHtmlToXSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=bc70fce929bf608f
// Assembly location: C:\Projects\devnet\TemplateEditor\TemplateEditor\lib\WkHtmlToXSharp.dll

namespace WkHtmlToXSharp
{
    public class PdfGlobalSettings
    {
        public int Dpi { get; set; }
        public int ImageDpi { get; set; }
        public int ImageQuality { get; set; }
        public PdfMarginSettings Margin { get; }
        public string Out { get; set; }
        public PdfOrientation Orientation { get; set; }
        public PdfSize Size { get; }
    }
}
