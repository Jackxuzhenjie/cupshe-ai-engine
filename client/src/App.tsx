import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Newsletter from "./pages/Newsletter";
import NewsletterDetail from "./pages/NewsletterDetail";
import WishPool from "./pages/WishPool";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import BountyBoard from "./pages/BountyBoard";
import SkillTree from "./pages/SkillTree";
import CasesLibrary from "./pages/CasesLibrary";
import CaseSubmit from "./pages/CaseSubmit";
import Leaderboard from "./pages/Leaderboard";
import ControlTower from "./pages/ControlTower";
import Admin from "./pages/Admin";
import PromptLibrary from "./pages/PromptLibrary";
import WorkflowLibrary from "./pages/WorkflowLibrary";
import AgentLibrary from "./pages/AgentLibrary";
import DepartmentCenter from "./pages/DepartmentCenter";
import OrgStructure from "./pages/OrgStructure";
import FeishuSettings from "./pages/FeishuSettings";
import GlobalIntelligence from "./pages/GlobalIntelligence";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/newsletter" component={Newsletter} />
        <Route path="/newsletter/:id" component={NewsletterDetail} />
        <Route path="/wishes" component={WishPool} />
        <Route path="/challenges" component={Challenges} />
        <Route path="/challenges/:id" component={ChallengeDetail} />
        <Route path="/bounty" component={BountyBoard} />
        <Route path="/skills" component={SkillTree} />
        <Route path="/cases" component={CasesLibrary} />
        <Route path="/cases/submit" component={CaseSubmit} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/prompts" component={PromptLibrary} />
        <Route path="/workflows" component={WorkflowLibrary} />
        <Route path="/agents" component={AgentLibrary} />
        <Route path="/department" component={DepartmentCenter} />
        <Route path="/org" component={OrgStructure} />
        <Route path="/intelligence" component={GlobalIntelligence} />
        <Route path="/feishu" component={FeishuSettings} />
        <Route path="/control-tower" component={ControlTower} />
        <Route path="/admin" component={Admin} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
