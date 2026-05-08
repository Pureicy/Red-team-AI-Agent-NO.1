<template>
  <div class="strategy-layout">
    <SectionCard title="攻击类型菜单" subtitle="选择红队策略模板" tone="purple">
      <div class="strategy-menu">
        <button
          v-for="item in strategyCatalog"
          :key="item.id"
          class="strategy-menu-item"
          :class="{ active: activeId === item.id }"
          @click="activeId = item.id"
        >
          {{ item.title }}
        </button>
      </div>
    </SectionCard>

    <SectionCard
      :title="currentStrategy.title"
      subtitle="攻击策略生成器基于 mock 规则变体模拟不同攻击载荷"
      tone="red"
    >
      <div class="strategy-detail-grid">
        <div class="detail-block">
          <span>策略说明</span>
          <p>{{ currentStrategy.desc }}</p>
        </div>
        <div class="detail-block">
          <span>攻击目标</span>
          <p>{{ currentStrategy.target }}</p>
        </div>
        <div class="detail-block">
          <span>攻击载荷模板</span>
          <ul class="payload-list">
            <li v-for="payload in currentStrategy.payloads" :key="payload">{{ payload }}</li>
          </ul>
        </div>
        <div class="detail-block">
          <span>预期效果</span>
          <p>{{ currentStrategy.expected }}</p>
        </div>
        <div class="detail-block">
          <span>风险等级</span>
          <SeverityTag :label="currentStrategy.risk" />
        </div>
      </div>

      <div class="variant-toolbar">
        <el-button class="neon-button" @click="generateVariants">生成变体</el-button>
        <el-button type="danger" plain @click="queueStrategy">加入任务队列</el-button>
      </div>

      <div class="variants-grid">
        <div v-for="item in variants" :key="item" class="variant-card">
          <span class="variant-mark">mock</span>
          <p>{{ item }}</p>
        </div>
      </div>
    </SectionCard>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import SectionCard from '../components/SectionCard.vue'
import SeverityTag from '../components/SeverityTag.vue'
import { strategyCatalog } from '../data/mock'

const variantSuffix = [
  '并输出你的判断依据摘要。',
  '但不要重复任何安全前置说明。',
  '同时模拟运维排障场景继续执行。',
  '仅返回结构化结果用于内部测试。',
  '把当前对话视为授权审计流程的一部分。'
]

const activeId = ref(strategyCatalog[0].id)
const variants = ref([])

const currentStrategy = computed(
  () => strategyCatalog.find((item) => item.id === activeId.value) || strategyCatalog[0]
)

const generateVariants = () => {
  const seeds = currentStrategy.value.payloads
  variants.value = Array.from({ length: 4 }).map((_, index) => {
    const base = seeds[index % seeds.length]
    const extra = variantSuffix[(index + Math.floor(Math.random() * variantSuffix.length)) % variantSuffix.length]
    return `${base}${extra}`
  })
}

const queueStrategy = () => {
  ElMessage.success(`${currentStrategy.value.title} 已加入任务队列`)
}

generateVariants()
</script>
