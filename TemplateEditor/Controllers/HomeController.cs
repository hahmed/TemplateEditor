using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using TemplateEditor.Models;
using WkHtmlToXSharp;

namespace TemplateEditor.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }


        public ActionResult GetMePDF()
        {
            var url = "http://stackoverflow.com/questions/1331926/calling-wkhtmltopdf-to-generate-pdf-from-html";

            var buffer = GetMyPdf();

            return File(buffer, "application/pdf");
        }

        private MultiplexingConverter _GetConverter()
        {
            var obj = new MultiplexingConverter();
            //obj.Begin += (s, e) => _Log.DebugFormat("Conversion begin, phase count: {0}", e.Value);
            //obj.Error += (s, e) => _Log.Error(e.Value);
            //obj.Warning += (s, e) => _Log.Warn(e.Value);
            //obj.PhaseChanged += (s, e) => _Log.InfoFormat("PhaseChanged: {0} - {1}", e.Value, e.Value2);
            //obj.ProgressChanged += (s, e) => _Log.InfoFormat("ProgressChanged: {0} - {1}", e.Value, e.Value2);
            //obj.Finished += (s, e) => _Log.InfoFormat("Finished: {0}", e.Value ? "success" : "failed!");
            return obj;
        }

        private byte[] GetMyPdf()
        {
            using (var wk = _GetConverter())
            {
                wk.GlobalSettings.Margin.Top = "2cm";
                wk.GlobalSettings.Margin.Bottom = "2cm";
                wk.GlobalSettings.Margin.Left = "2cm";
                wk.GlobalSettings.Margin.Right = "2cm";

                wk.ObjectSettings.Web.EnablePlugins = false;
                wk.ObjectSettings.Web.EnableJavascript = false;

                using (var stream = new MemoryStream(ReadHtmlFromFile(@"C:\Projects\devnet\TemplateEditor\TemplateEditor\lib\test.xhtml")))
                using (var sr = new StreamReader(stream))
                {
                    var str = sr.ReadToEnd();
                    var tmp = wk.Convert(str);
                    return tmp;
                }
            }
        }

        private byte[] ReadHtmlFromFile(string filePath)
        {
            using (FileStream fileStream = System.IO.File.OpenRead(filePath))
            {
                MemoryStream memStream = new MemoryStream();
                memStream.SetLength(fileStream.Length);
                fileStream.Read(memStream.GetBuffer(), 0, (int)fileStream.Length);
                return memStream.ToArray();
            }
        }

        public byte[] WKHtmlToPdf(string url)
        {
            var fileName = " - ";
            var wkhtmlDir = "C:\\Projects\\OtherPrograms\\wkhtmltopdf\\";
            var wkhtml = "C:\\Projects\\OtherPrograms\\wkhtmltopdf\\wkhtmltopdf.exe";
            var p = new Process
                        {
                            StartInfo =
                                {
                                    CreateNoWindow = true,
                                    RedirectStandardOutput = true,
                                    RedirectStandardError = true,
                                    RedirectStandardInput = true,
                                    UseShellExecute = false,
                                    FileName = wkhtml,
                                    WorkingDirectory = wkhtmlDir
                                }
                        };


            string switches = "";
            switches += "--print-media-type ";
            switches += "--margin-top 10mm --margin-bottom 10mm --margin-right 10mm --margin-left 10mm ";
            switches += "--page-size Letter ";
            p.StartInfo.Arguments = switches + " " + url + " " + fileName;
            p.Start();

            //read output
            var buffer = new byte[32768];
            byte[] file;
            using (var ms = new MemoryStream())
            {
                while (true)
                {
                    var read = p.StandardOutput.BaseStream.Read(buffer, 0, buffer.Length);

                    if (read <= 0)
                    {
                        break;
                    }
                    ms.Write(buffer, 0, read);
                }
                file = ms.ToArray();
            }

            // wait or exit
            p.WaitForExit(60000);

            // read the exit code, close process
            var returnCode = p.ExitCode;
            p.Close();

            return returnCode == 0 ? file : null;
        }


        public ActionResult GetFields(string fieldName)
        {
            var list = new Dictionary<int, string>
                           {
                               {1, "something"},
                               {22, "anotherThing"},
                               {154, "someField"},
                               {65, "MyField"},
                               {74845, "NoField"}
                           };


            var obj = new
                          {
                              Error = false,
                              Fields = list.Where(x=> x.Value.Contains(fieldName)).ToDictionary(x=> x.Key,y=> y.Value)
                          };

            var jsonNetResult = new JsonNetResult {Data = obj};

            return jsonNetResult;
        }
    }


    public class JsonNetResult : ActionResult
    {

        public Encoding ContentEncoding { get; set; }

        public string ContentType { get; set; }

        public object Data { get; set; }

        public JsonSerializerSettings SerializerSettings { get; set; }

        public Formatting Formatting { get; set; }


        public JsonNetResult()
        {

            SerializerSettings = new JsonSerializerSettings();

        }

        public override void ExecuteResult(ControllerContext context)
        {

            if (context == null)

                throw new ArgumentNullException("context");

            HttpResponseBase response = context.HttpContext.Response;

            response.ContentType = !string.IsNullOrEmpty(ContentType) 
                                       ? ContentType 
                                       : "application/json";

            if (ContentEncoding != null)
                response.ContentEncoding = ContentEncoding;

            if (Data == null) 
                return; //return error = true?

            JsonTextWriter writer = new JsonTextWriter(response.Output) { Formatting = Formatting };

            JsonSerializer serializer = JsonSerializer.Create(SerializerSettings);

            serializer.Serialize(writer, Data);

            writer.Flush();
        }

    }


}
