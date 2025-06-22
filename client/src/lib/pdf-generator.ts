import { ResumeData } from "@/types/schema";
import { normalizeUrl } from "@/lib/utils";

export type TemplateType =
  | "classic-professional"
  | "modern-blue"
  | "minimalist"
  | "creative-gradient"
  | "elegant-bw"
  | "tech-startup"
  | "modern-sidebar"
  | "minimal-classic"
  | "elegant-serif"
  | "sidebar-highlight"
  | "two-column-grid"
  | "dark-theme"
  | "professional"
  | "modern"
  | "creative"
  | "minimal";

export const generatePDF = async (data: ResumeData, template: TemplateType = "classic-professional") => {
  try {
    console.log('Starting PDF generation for template:', template);
    
    // Normalize all URLs in ResumeData
    const normalizedData: ResumeData = {
      ...data,
      linkedin: normalizeUrl(data.linkedin),
      github: normalizeUrl(data.github),
      website: normalizeUrl(data.website),
      projects: data.projects.map((proj) => ({
        ...proj,
        liveUrl: normalizeUrl(proj.liveUrl),
        codeUrl: normalizeUrl(proj.codeUrl),
      })),
    };

    // Get the HTML content from the preview component
    console.log('Looking for resume preview element...');
    const previewContainer = document.querySelector('[data-resume-preview]') as HTMLElement;
    
    if (!previewContainer || !previewContainer.firstElementChild) {
      console.error('Resume preview element or its child not found.');
      throw new Error('Resume preview element not found. Please ensure the resume is properly loaded.');
    }

    console.log('Found preview element, cloning its child...');
    // Clone the A4-sized element to avoid modifying the original
    const clonedElement = previewContainer.firstElementChild.cloneNode(true) as HTMLElement;
    
    // IMPORTANT: Reset transformations and remove decorative styles for a clean PDF
    clonedElement.style.transform = 'none';
    clonedElement.style.margin = '0';
    clonedElement.style.maxWidth = 'none';
    clonedElement.style.maxHeight = 'none';
    clonedElement.style.border = 'none';
    clonedElement.style.borderRadius = '0';
    clonedElement.style.boxShadow = 'none';
    clonedElement.style.padding = '0';
    clonedElement.style.background = '#ffffff';
    clonedElement.style.width = '210mm';
    clonedElement.style.height = 'auto'; // Let content define the height
    clonedElement.style.overflow = 'visible'; // Ensure nothing is clipped

    // Remove any interactive elements that shouldn't be in PDF
    const interactiveElements = clonedElement.querySelectorAll('button, input, select, textarea');
    console.log('Removing', interactiveElements.length, 'interactive elements');
    interactiveElements.forEach(el => el.remove());

    // Get the computed styles and create a complete HTML document
    console.log('Extracting styles...');
    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          console.warn('Could not access stylesheet:', e);
          return '';
        }
      })
      .join('\n');

    // Add additional styles for PDF optimization
    const pdfStyles = `
      @media print {
        * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
      }
      html, body { 
        margin: 0 !important; 
        padding: 0 !important;
        background: #fff !important;
        width: 210mm !important;
        height: auto !important;
        overflow: visible !important;
      }
      * {
        box-sizing: border-box;
      }
    `;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume - ${data.firstName} ${data.lastName}</title>
        <style>
          ${styles}
          ${pdfStyles}
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          * {
            box-sizing: border-box;
          }
        </style>
      </head>
      <body>
        ${clonedElement.outerHTML}
      </body>
      </html>
    `;

    console.log('HTML content prepared, length:', htmlContent.length);
    console.log('Sending PDF request to server...');
    
    const response = await fetch('https://resume-builder-7slj.onrender.com/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        html: htmlContent,
        filename: `${data.firstName}_${data.lastName}_Resume.pdf`
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error response text:', errorText);

      let errorMessage = 'Failed to generate PDF from server.';
      if (errorText) {
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.details || errorData.error || `Server Error: ${response.status}`;
        } catch (e) {
          // If parsing fails, use the raw text, but truncate it for display
          errorMessage = errorText.substring(0, 200) + (errorText.length > 200 ? '...' : '');
        }
      } else {
        errorMessage = `Server returned status ${response.status} with no error message.`;
      }
      
      throw new Error(errorMessage);
    }

    console.log('Downloading PDF...');
    // Download the PDF
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.firstName}_${data.lastName}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('PDF download completed successfully');

  } catch (error: any) {
    console.error('PDF generation error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw error;
  }
};
