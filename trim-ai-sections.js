const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/posts.ts');
let fileContent = fs.readFileSync(filePath, 'utf8');

// AI-sounding section titles that should be removed (these come after good content)
const aiSectionPatterns = [
  /neuroscience of/i,
  /revenue diversification/i,
  /customer lifetime value/i,
  /platform evolution and future/i,
  /advanced engagement tactics/i,
  /building resilience against metric/i,
  /strategies for sustainable audience/i,
  /building audience resilience/i,
  /converting viral reach into lasting/i,
  /audience quality metrics/i,
  /post-viral content strategy/i,
  /follower value framework/i,
  /the mathematics of viral distribution/i,
  /competitor analysis without copying/i,
  /hook testing and validation systems/i,
  /advanced hook formulas for experienced/i,
  /hook performance analytics/i,
  /platform-specific hook adaptation/i,
  /hook library management/i,
  /hook emotional triggers/i,
  /hook failure analysis/i,
  /building automated sales systems/i,
  /scaling passive income beyond/i,
  /scaling from one thousand/i,
  /product ecosystem architecture/i,
  /passive income myths vs reality/i,
  /passive income sustainability/i,
  /product ecosystem strategy/i,
  /revenue diversification principles/i,
  /revenue diversification benefits/i,
  /passive income timeline expectations/i,
  /cross-platform growth correlation/i,
  /cross-platform analytics insights/i,
  /content adaptation framework/i,
  /building engagement through intentional/i,
  /the engagement economy advantage/i,
  /monetization at small scale/i,
  /physical and cognitive costs/i,
  /optimal frequency research/i,
  /building a sustainable publishing/i,
  /the sustainability of posting/i,
  /the hidden cost of daily posting/i,
  /diagnostic framework for flops/i,
  /algorithm distribution patterns/i,
  /the honest creator audit/i,
  /the data-driven creator mindset/i,
  /building a personal analytics system/i,
  /building personal analytics systems/i,
  /predictive metrics/i,
  /the data-driven creator$/i,
  /the affiliate marketing funnel that converts/i,
  /the five-stage affiliate funnel/i,
  /maintaining authenticity while monetizing/i,
  /affiliate disclosure best practices/i,
  /the science of batch performance/i,
  /technical setup for speed/i,
  /energy management during sessions/i,
  /batch performance science/i,
  /testing results across seven tools/i,
  /real value proposition/i,
  /honest verdict on ai caption/i,
  /future of ai writing/i,
  /ai caption tool cost analysis/i,
  /ai writing tool selection guide/i,
  /ai feature evolution and future/i,
  /the strategy tool landscape/i,
  /story sales psychology/i,
  /seven-slide sequence/i,
  /product development lifecycle/i,
  /pricing psychology/i,
  /pricing strategy and psychology/i,
  /product validation before building/i,
  /small creator rate evolution/i,
  /media kit update frequency/i,
  /diagnostic framework for stalled/i,
  /recovery timeline and expectations/i,
  /diagnostic framework$/i,
  /recovery timeline$/i,
  /breaking through growth plateaus/i,
  /strategic advantage through auditing/i,
  /creating actionable insights/i,
  /actionable insights$/i,
  /monthly audits for growth/i,
  /sustainable niche criteria/i,
  /future-proofing your niche/i,
  /future-proofing$/i,
  /faceless content creation tools/i,
  /burnout-resistant systems/i,
  /long-term sustainability$/i,
  /sustainable creator life/i,
  /creator mental health resources/i,
  /creator career longevity/i,
  /the real cost of a professional creator/i,
  /building an ai-assisted workflow/i,
  /ethical considerations and audience/i,
  /what is coming next in ai/i,
  /the creator ai stack of 2026/i,
  /ai ethics for creators/i,
  /understanding the faceless creator business/i,
  /content quality standards that separate/i,
  /long-term sustainability strategies/i,
  /frequently asked questions about faceless/i,
  /performance comparison in real creator/i,
  /integration and workflow optimization/i,
  /deep analysis across content types/i,
  /cost optimization$/i,
  /creator workflow integration/i,
  /output quality comparison/i,
  /tool selection decision framework/i,
  /content creation speed comparison/i,
  /brand deal contract basics/i,
  /brand deal negotiation tactics/i,
  /audio engineering for non-engineers/i,
  /visual composition rules that professionals/i,
  /professional lighting on a budget/i,
  /audio engineering basics/i,
  /common framing mistakes/i,
  /audio post-processing guide/i,
  /quick reference: professional checklist/i,
  /common beginner mistakes/i,
  /lighting setup for different budgets/i,
  /audio quality hierarchy/i,
  /the passive income myth and reality/i,
  /building passive income systems that last/i,
  /the science behind creator burnout/i,
  /the recovery protocol that worked/i,
  /building sustainable systems$/i,
  /when to seek professional help/i,
  /case study: my two-week digital detox/i,
  /building a sustainable content system/i,
  /when burnout becomes depression/i,
  /the business case for sustainable creation/i,
  /how to set boundaries with your audience/i,
  /building a support system/i,
  /the economics of sustainable creation/i,
  /building a team that protects/i,
  /creator health warning signs/i,
  /long-term sustainability framework/i,
  /detailed testing results across all seven/i,
  /caption performance testing/i,
  /ai tool output quality benchmarks/i,
  /caption writing speed comparison/i,
  /the 90-minute weekly workflow/i,
  /tool #2 that wasted my money/i,
  /tool #3 that wasted my money/i,
  /the content matrix that actually/i,
];

// Find content fields and trim AI sections
const marker = 'content: `';
let totalFixed = 0;
let totalSectionsRemoved = 0;
let pos = 0;

while (true) {
  const startIdx = fileContent.indexOf(marker, pos);
  if (startIdx === -1) break;

  const contentStart = startIdx + marker.length;
  let contentEnd = -1;
  let searchPos = contentStart;

  while (searchPos < fileContent.length) {
    const nextBacktick = fileContent.indexOf('`', searchPos);
    if (nextBacktick === -1) break;
    const afterBacktick = fileContent.substring(nextBacktick + 1, nextBacktick + 3);
    if (afterBacktick.startsWith(',')) {
      contentEnd = nextBacktick;
      break;
    }
    searchPos = nextBacktick + 1;
  }

  if (contentEnd === -1) {
    pos = contentStart;
    continue;
  }

  const originalContent = fileContent.substring(contentStart, contentEnd);
  const cleanedContent = trimAISections(originalContent);

  if (cleanedContent !== originalContent) {
    fileContent = fileContent.substring(0, contentStart) + cleanedContent + fileContent.substring(contentEnd);
    totalFixed++;
    pos = contentStart + cleanedContent.length + 1;
  } else {
    pos = contentEnd + 1;
  }
}

console.log(`\nArticles trimmed: ${totalFixed}`);
console.log(`Total AI sections removed: ${totalSectionsRemoved}`);
fs.writeFileSync(filePath, fileContent, 'utf8');
console.log('File saved.');

function trimAISections(html) {
  // Split by H2 tags
  const parts = html.split(/(?=<h2>)/);
  const kept = [];

  for (const part of parts) {
    const headingMatch = part.match(/<h2>(.*?)<\/h2>/);
    if (!headingMatch) {
      kept.push(part); // intro section - always keep
      continue;
    }

    const heading = headingMatch[1].replace(/<[^>]*>/g, '').trim();

    // Check if this heading matches any AI pattern
    let isAI = false;
    for (const pattern of aiSectionPatterns) {
      if (pattern.test(heading)) {
        isAI = true;
        break;
      }
    }

    if (isAI) {
      totalSectionsRemoved++;
      console.log(`  Removing: "${heading}"`);
    } else {
      kept.push(part);
    }
  }

  return kept.join('');
}
