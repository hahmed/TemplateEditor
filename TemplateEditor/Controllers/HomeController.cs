using System;
using System.Diagnostics;
using System.IO;
using System.Web.Mvc;

namespace TemplateEditor.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {
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

            var buffer = WKHtmlToPdf(url);

            return File(buffer, "application/pdf");
        }

        private void DoDownload()
        {
            var url = "http://stackoverflow.com/questions/1331926/calling-wkhtmltopdf-to-generate-pdf-from-html";
            var file = WKHtmlToPdf(url);
            if (file != null)
            {
                Response.ContentType = "Application/pdf";
                Response.BinaryWrite(file);
                Response.End();
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

    }
}
